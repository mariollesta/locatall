import React, { useState } from "react";
import { Utensils } from "lucide-react";

import { ResetRecommender } from "@components/ResetRecommender";
import { FoodResult } from "@components/FoodResult";

export const FoodRecommender = () => {
  const [distance, setDistance] = useState("1");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const recommendations = [
    { name: "Sushi Delight", rating: 4.8 },
    { name: "Burger Haven", rating: 4.6 },
    { name: "Pasta Paradise", rating: 4.7 },
    { name: "Taco Town", rating: 4.5 },
    { name: "Veggie Venture", rating: 4.9 },
  ];

  const handleFindPlace = () => {
    setShowRecommendations(true);
  };

  const handleReset = () => {
    setDistance("1");
    setShowRecommendations(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {!showRecommendations ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <Utensils className="mx-auto mb-6 text-gray-400" size={48} />
          <p className="text-gray-600 mb-8">
            Los mejores lugares para comer cerca de ti.
          </p>
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
          <button
            onClick={handleFindPlace}
            className="bg-blue-500 text-white rounded-lg shadow-md px-6 py-3 font-medium hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Buscar restaurantes
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 text-center">
            {/* Uso de ResetRecommender */}
            <ResetRecommender resetSearch={handleReset} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Top 5 recomendaciones
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
