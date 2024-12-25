from fastapi import APIRouter, HTTPException, Query
import requests
import os
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

if not GOOGLE_PLACES_API_KEY:
    raise RuntimeError("Google Places API Key not configured. Check your .env file.")

router = APIRouter()

@router.get("/restaurants")
def get_nearby_restaurants(
    lat: float = Query(..., description="Latitude of the location"),
    lng: float = Query(..., description="Longitude of the location"),
    radius: int = Query(1000, description="Search radius in meters (default 1 km)"),
):
    """
    Get nearby restaurants using Google Places API (Nearby Search - New).
    """
    try:
        # Google Places API base URL for Nearby Search (New)
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

        # Request parameters
        params = {
            "location": f"{lat},{lng}",
            "radius": radius,
            "type": "restaurant",
            "key": GOOGLE_PLACES_API_KEY,
        }

        # Send GET request to Google Places API
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise HTTP errors

        # Parse JSON response
        data = response.json()
        if "error_message" in data:
            raise HTTPException(
                status_code=502,
                detail=f"Google API Error: {data['error_message']}"
            )

        # Filter relevant results
        restaurants = [
            {
                "name": place.get("name"),
                "rating": place.get("rating"),
                "address": place.get("vicinity"),
            }
            for place in data.get("results", [])
        ]

        return {"success": True, "data": restaurants}

    except requests.exceptions.RequestException as e:
        raise HTTPException(
            status_code=502,
            detail=f"Error connecting to Google Places API: {str(e)}"
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An unexpected error occurred: {str(e)}"
        )
