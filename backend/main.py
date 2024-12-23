import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import restaurants

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar "*" por el dominio del frontend en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(restaurants.router, prefix="/api", tags=["restaurants"])

@app.get("/")
def read_root():
    google_api_key = os.getenv("GOOGLE_PLACES_API_KEY")
    return {"message": f"¡Hola, mundo desde FastAPI! Tu API Key es {google_api_key}"}
