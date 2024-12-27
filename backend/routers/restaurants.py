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
def get_top_restaurants(
    lat: float = Query(..., description="Latitude of the location"),
    lng: float = Query(..., description="Longitude of the location"),
    radius: int = Query(1000, description="Search radius in meters (default 1 km)"),
):
    """
    Get the top 5 restaurants by rating using Google Places API (Nearby Search).
    """
    try:
        # Google Places API base URL for Nearby Search
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

        # Extract and sort restaurants by rating
        restaurants = [
            {
                "name": place.get("name"),
                "rating": place.get("rating"),
                "address": place.get("vicinity"),
            }
            for place in data.get("results", [])
            if place.get("rating") is not None  # Only include places with a rating
        ]

        # Sort by rating (highest first) and take the top 5
        top_restaurants = sorted(
            restaurants, key=lambda x: x["rating"], reverse=True
        )[:5]

        return {"success": True, "data": top_restaurants}

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
