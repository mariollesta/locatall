import os
import httpx
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Read API key
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

if not GOOGLE_PLACES_API_KEY:
    raise RuntimeError("Google Places API Key not configured. Check your .env file.")

router = APIRouter()

# Valid types of places
VALID_PLACE_TYPES = ["restaurant", "cafe", "bar"]

def validate_place_type(place_type: str):
    """Validate the requested place type."""
    if place_type not in VALID_PLACE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid place type. Allowed values are: {', '.join(VALID_PLACE_TYPES)}"
        )


def build_google_places_params(lat: float, lng: float, radius: int, place_type: str) -> dict:
    """Construct the parameters for the Google Places API request."""
    return {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": place_type,
        "key": GOOGLE_PLACES_API_KEY,
    }
    
    
def handle_google_api_errors(data: dict):
    """Handle Google Places API specific errors."""
    api_status = data.get("status")
    error_message = data.get("error_message", "Unknown error from Google Places API")
    
    if api_status == "ZERO_RESULTS":
        raise HTTPException(status_code=404, detail="No results found for the specified location and criteria.")
    elif api_status == "OVER_QUERY_LIMIT":
        raise HTTPException(status_code=429, detail="Quota exceeded for Google Places API.")
    elif api_status == "REQUEST_DENIED":
        raise HTTPException(status_code=403, detail=f"Request denied by Google Places API: {error_message}")
    elif api_status == "INVALID_REQUEST":
        raise HTTPException(status_code=400, detail=f"Invalid request sent to Google Places API: {error_message}")
    elif api_status == "UNKNOWN_ERROR":
        raise HTTPException(status_code=502, detail="An unknown error occurred on the Google Places API side.")
    elif api_status != "OK":
        raise HTTPException(status_code=500, detail=f"Unhandled API status: {api_status}. Message: {error_message}")


def extract_top_places(data: dict) -> list:
    """Extract and sort the top 5 places by rating."""
    places = [
        {
            "name": place.get("name"),
            "rating": place.get("rating"),
            "address": place.get("vicinity"),
            "open_now": place.get("opening_hours", {}).get("open_now", False),
        }
        for place in data.get("results", [])
        if place.get("rating") is not None  # Include only places with ratings
    ]
    return sorted(places, key=lambda x: x["rating"], reverse=True)[:5]


@router.get("/foodplaces")
async def get_food_places(
    lat: float = Query(..., description="Latitude of the location"),
    lng: float = Query(..., description="Longitude of the location"),
    radius: int = Query(1000, description="Search radius in meters (default 1 km)"),
    place_type: str = Query("restaurant", description="Type of place to search (default: restaurant)"),
):
    """
    Get the top 5 places by rating (restaurants, cafes, bars, etc.) using Google Places API.
    """
    # Validate the place type
    validate_place_type(place_type)

    # Build API parameters
    params = build_google_places_params(lat, lng, radius, place_type)

    try:
        # Send request to Google Places API
        async with httpx.AsyncClient() as client:
            response = await client.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", params=params)
            response.raise_for_status()

        # Parse JSON response and handle API specific errors
        data = response.json()
        handle_google_api_errors(data)

        # Extract and return top places
        top_places = extract_top_places(data)
        return {"success": True, "data": top_places}

    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Error connecting to Google Places API: {str(e)}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"HTTP error occurred: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
