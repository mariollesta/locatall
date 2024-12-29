import React, { useState } from "react";
import axios from "axios";
import { Utensils } from "lucide-react";

import { ResetRecommender } from "@components/ResetRecommender";
import { FoodResult } from "@components/FoodResult";

export const FoodRecommender = () => {
  const [distance, setDistance] = useState("1"); // distance state
  const [showRecommendations, setShowRecommendations] = useState(false); // show results 
  const [location, setLocation] = useState(null); // current location state
  const [recommendations, setRecommendations] = useState([]); // results state
  const [isLoading, setIsLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state for geolocation

  const handleFindPlace = async () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }
  
    setIsLoading(true);
    setError(null); // Reset error state
  
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
  
        try {
          const response = await axios.get("http://localhost:8000/api/restaurants", {
            params: {
              lat: latitude,
              lng: longitude,
              radius: distance * 1000, // radius in metres
            },
          });
  
          setRecommendations(response.data.data);
          setShowRecommendations(true);
        } catch (error) {
          setError(error.response?.data?.detail || "Error al obtener los datos.");
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setError("No se pudo obtener la ubicación. Por favor, inténtalo nuevamente.");
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  
  const handleReset = () => {
    setDistance("1");
    setShowRecommendations(false);
    setRecommendations([]);
    setLocation(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {!showRecommendations ? (
        <div className="bg-white shadow-lg p-8 mb-6 border-4 border-[#4CAF50] rounded-2xl text-center">
          <Utensils className="mx-auto mb-6 text-[#FFA500] animate-bounce" size={48} />
          <p className="text-[#333333] mb-8 text-center text-lg font-semibold">
            Encuentra los mejores lugares para comer
          </p>
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-center text-[#4CAF50]">¿Donde estás dispuesto a llegar?</h3>
            <div className="flex flex-col space-y-2">
              {[{ value: "1", label: "A menos de 1 km" },
                { value: "5", label: "A menos de 5 km" },
                { value: "10", label: "A menos de 10 km" },
              ].map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`distance-${option.value}`}
                    name="distance"
                    value={option.value}
                    checked={distance === option.value}
                    onChange={() => setDistance(option.value)}
                    className="hidden peer"
                  />
                  <label
                    htmlFor={`distance-${option.value}`}
                    className="flex flex-1 items-center justify-between rounded-xl border-2 border-[#E0E0E0] bg-[#FFFFFF] p-4 hover:bg-[#F5F5F5] hover:text-[#FFA500] peer-checked:border-[#FFA500] peer-checked:bg-[#FFF8E1] cursor-pointer transition-all"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleFindPlace}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "cursor-not-allowed opacity-50 bg-gradient-to-r from-[#FFA500] to-[#4CAF50]"
                  : "bg-gradient-to-r from-[#FFA500] to-[#4CAF50] hover:from-[#FF9000] hover:to-[#45a049] hover:scale-105"
              } text-[#FFFFFF] rounded-2xl px-6 py-3 font-bold text-lg transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-50 flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Buscando...
                </>
              ) : (
                "¡Busca la comida! 🍳"
              )}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            <ResetRecommender resetSearch={handleReset} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#FFFFFF] shadow-text">
              {recommendations.length > 0 
                ? `Top ${recommendations.length} recomendaciones` 
                : "No se encontraron lugares cercanos"}
            </h2>

            {recommendations.length > 0 ? (
              recommendations.map((place, index) => (
                <FoodResult 
                  key={index} 
                  name={place.name} 
                  rating={place.rating} 
                  open_now={place.open_now}
                />
              ))
            ) : (
              <div className="text-center text-gray-500">
                Ajusta la distancia de búsqueda o verifica tu ubicación
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
