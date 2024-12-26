import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating }) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden p-4">

      {/* Restaurant details */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        {rating && (
          <div className="flex items-center mt-1 text-yellow-500">
            <Star className="w-4 h-4 mr-1" />
            <span>{rating}</span>
          </div>
        )}
      </div>
      
      {/* Map Button */}
      <button
        className="flex items-center px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
        onClick={() => alert(`Mostrar ${name} en el mapa`)}
      >
        <MapPin className="w-4 h-4 mr-2" />
        Ver en Maps
      </button>
    
    </div>
  );
}
