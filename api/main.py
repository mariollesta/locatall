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
    return {"message": "Hello, this is Gotoeat API!"}
