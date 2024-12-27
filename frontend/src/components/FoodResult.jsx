import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating }) {
  const generateGoogleMapsLink = (restaurantName) => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${encodeURIComponent(restaurantName)}`;
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md border-2 border-[#E0E0E0] hover:border-[#4CAF50] transition-all duration-300 transform hover:scale-105 overflow-hidden">
      
      {/* Restaurant details */}
      <div className="flex-grow min-w-0">
        <h3 className="text-lg font-bold text-[#FFA500] truncate">{name}</h3>
        {rating && (
          <div className="flex items-center mt-1 text-[#333333]">
            <Star className="w-4 h-4 text-[#FFA500] mr-1" />
            <span className="font-semibold text-[#333333]">{rating}</span>
          </div>
        )}
      </div>
      
      {/* Map Button */}
      <a
        href={generateGoogleMapsLink(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 flex-shrink-0 w-36 h-10 flex items-center justify-center bg-[#FFFFFF] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#FFFFFF] border border-[#4CAF50] rounded-md font-medium transition duration-300 ease-in-out"
      >
        <MapPin className="w-4 h-4 mr-2" />
        Ver en Maps
      </a>

    </div>
  );
}
