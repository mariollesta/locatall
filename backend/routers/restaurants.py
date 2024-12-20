from fastapi import APIRouter, Query
import requests
import os
from dotenv import load_dotenv

# Load API Key from .env
load_dotenv()
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

router = APIRouter()

@router.get("/restaurants")
def get_nearby_restaurants(lat: float = Query(...), lng: float = Query(...)):
    """
    Get nearby restaurants using Google Places API.
    """
    try:
        # Google Places API
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        
        # request parametees
        params = {
            "location": f"{lat},{lng}",
            "radius": 1000,  # (1 km)
            "type": "restaurant",
            "key": GOOGLE_PLACES_API_KEY,
        }
        
        # Google Places API request
        response = requests.get(url, params=params)
        response.raise_for_status()  # HTTP errors

        data = response.json()

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
        return {"success": False, "error": str(e)}
