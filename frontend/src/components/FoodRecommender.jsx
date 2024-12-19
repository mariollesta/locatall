import React, { useState } from "react";
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

  const dummyRecommendations = [
    { name: "Sushi Delight", rating: 4.8 },
    { name: "Burger Haven", rating: 4.6 },
    { name: "Pasta Paradise", rating: 4.7 },
    { name: "Taco Town", rating: 4.5 },
    { name: "Veggie Venture", rating: 4.9 },
  ];

  const handleFindPlace = () => {

    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      return;
    }

    setIsLoading(true);
    setError(null); // Reset any previous error

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });
        console.log("Ubicación obtenida:", latitude, longitude);

        // Simular resultados con un tiempo de espera
        setTimeout(() => {
          setRecommendations(dummyRecommendations);
          setShowRecommendations(true);
          setIsLoading(false);
        }, 3000);
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMsg = "Permiso de geolocalización denegado. Por favor, habilita los permisos en la configuración de tu navegador."
            break;
          case error.POSITION_UNAVAILABLE:
            errorMsg = "La información de ubicación no está disponible. Intenta nuevamente más tarde."
            break;
          case error.TIMEOUT:
            errorMsg = "El tiempo de espera para obtener la ubicación se ha agotado. Intenta nuevamente."
            break;
          default:
            errorMsg = "Ocurrió un error desconocido."
            break;
        }
        setError(errorMsg);
        console.error("Error de geolocalización:", err);
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
    <div className="max-w-2xl mx-auto px-4 py-8">
      {!showRecommendations ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <Utensils className="mx-auto mb-6 text-gray-400" size={48} />
          <p className="text-gray-600 mb-8">
            Los mejores lugares para comer cerca de ti.
          </p>
          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Buscar por distancia</h3>
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
                    className="flex flex-1 items-center justify-between rounded-lg border-2 border-gray-300 bg-gray-50 p-4 cursor-pointer hover:bg-blue-50 hover:text-blue-600 peer-checked:border-blue-500 peer-checked:bg-blue-100"
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
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded-lg shadow-md px-6 py-3 font-medium transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Buscando...
                </>
              ) : (
                "Buscar Lugares"
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
            <h2 className="text-2xl font-semibold text-center mb-4">
              Top {recommendations.length} recomendaciones
            </h2>
            {recommendations.map((place, index) => (
              <FoodResult key={index} name={place.name} rating={place.rating} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
