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
    # Valid types of places
    valid_types = ["restaurant", "cafe", "bar"]

    # Validate the type of place
    if place_type not in valid_types:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid place type. Allowed values are: {', '.join(valid_types)}"
        )

    # Google Places API base URL for nearby searches
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

    # Application parameters
    params = {
        "location": f"{lat},{lng}",
        "radius": radius,
        "type": place_type,
        "key": GOOGLE_PLACES_API_KEY,
    }

    try:
        # httpx to send the GET request asynchronously
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)

        # Parse JSON response
        data = response.json()

        # Handle Google API-specific errors based on status field in the response
        api_status = data.get("status")
        if api_status != "OK":
            error_message = data.get("error_message", "Unknown error from Google Places API")
            if api_status == "ZERO_RESULTS":
                raise HTTPException(
                    status_code=404,
                    detail="No results found for the specified location and criteria."
                )
            elif api_status == "OVER_QUERY_LIMIT":
                raise HTTPException(
                    status_code=429,
                    detail="Quota exceeded for Google Places API."
                )
            elif api_status == "REQUEST_DENIED":
                raise HTTPException(
                    status_code=403,
                    detail=f"Request denied by Google Places API: {error_message}"
                )
            elif api_status == "INVALID_REQUEST":
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid request sent to Google Places API: {error_message}"
                )
            elif api_status == "UNKNOWN_ERROR":
                raise HTTPException(
                    status_code=502,
                    detail="An unknown error occurred on the Google Places API side. Please try again later."
                )
            else:
                raise HTTPException(
                    status_code=500,
                    detail=f"Unhandled API status: {api_status}. Message: {error_message}"
                )

        # Extract and sort places by qualification
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

        # Sort by rating (from highest to lowest) and take the 5 best ones.
        top_places = sorted(places, key=lambda x: x["rating"], reverse=True)[:5]

        return {"success": True, "data": top_places}

    except httpx.RequestError as e:
        # Handle connection-related errors
        raise HTTPException(
            status_code=502,
            detail=f"Error connecting to Google Places API: {str(e)}"
        )

    except httpx.HTTPStatusError as e:
        # Handle HTTP errors
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"HTTP error occurred: {str(e)}"
        )

    except Exception as e:
        # Handle any other exceptions
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )
