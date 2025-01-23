import os 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routers import foodplaces

# Load variables
load_dotenv()

# Read allowed origins 
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(foodplaces.router, prefix="/api", tags=["foodplaces"])

@app.get("/")
def read_root():
    return {"message": "Hello, this is Gotoeat API!"}
