import React, { useState } from "react";
import { Utensils, MapPin } from "lucide-react";

export const FoodRecommender = () => {
  const [distance, setDistance] = useState("1");
  const [recommendation, setRecommendation] = useState(null);

  const getRecommendation = () => {
    // Simular recomendación
    setRecommendation("Pasta Palace");
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

        {/* Icon */}
        <Utensils className="mx-auto mb-6 text-gray-400" size={48} />
        
        {/* Introduction */}
        <p className="text-gray-600 mb-8">
          Los mejores lugares para comer cerca de ti
        </p>
        
        {/* Distance */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Search by distance:</h3>
          <div className="flex flex-col space-y-2">
            {[
              { value: "1", label: "Less than 1 km" },
              { value: "5", label: "Less than 5 km" },
              { value: "10", label: "Less than 10 km" },
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
        
        {/* Recommendation */}
        {recommendation ? (
          <div className="mb-8">
            <p className="text-xl font-medium mb-2">We recommend:</p>
            <p className="text-2xl font-semibold text-blue-600">{recommendation}</p>
            <p className="text-sm text-gray-500 mt-2">
              (Within {distance} km of your location)
            </p>
          </div>
        ) : null}
        
        {/* Button */}
        <button
          onClick={getRecommendation}
          className="bg-blue-500 text-white rounded-full px-6 py-3 font-medium hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Find a Place
        </button>
      </div>
      {/* Enlace al mapa */}
      {recommendation && (
        <div className="mt-6 text-center">
          <a
            href="#"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out"
          >
            <MapPin className="mr-2" size={18} />
            View on map
          </a>
        </div>
      )}
    </div>
  );
};
