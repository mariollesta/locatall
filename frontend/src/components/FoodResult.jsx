import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating }) {
  
  const generateGoogleMapsLink = (restaurantName) => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${encodeURIComponent(restaurantName)}`;
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden p-4">
      
      {/* Restaurant details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        {rating && (
          <div className="flex items-center mt-1 text-yellow-500">
            <Star className="w-4 h-4 mr-1" />
            <span>{rating}</span>
          </div>
        )}
      </div>
      
      {/* Map Button */}
      <a
        href={generateGoogleMapsLink(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 flex items-center px-3 py-2 bg-white rounded-md border border-gray-200 shadow-sm hover:bg-gray-50 whitespace-nowrap"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Ver en Maps
      </a>
    
    </div>
  );
}
