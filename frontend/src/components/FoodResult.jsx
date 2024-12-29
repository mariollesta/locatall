import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating, open_now }) {
  const generateGoogleMapsLink = (restaurantName) => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${encodeURIComponent(restaurantName)}`;
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow-md border-2 border-[#E0E0E0] hover:border-[#4CAF50] transition-all duration-300 transform hover:scale-105">
      {/* Left Section: Name, Rating, Open/Closed */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-[#FFA500] truncate">{name}</h3>
        {rating && (
          <div className="flex items-center mt-1 text-[#333333]">
            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-[#FFA500] mr-1" />
            <span className="font-semibold text-sm sm:text-base">{rating}</span>
            <span
              className={`mt-2 sm:mt-0 sm:ml-4 text-xs sm:text-sm font-bold py-1 px-3 rounded-full ${
                open_now ? "bg-[#4CAF50] text-white" : "bg-[#FF4C4C] text-white"
              }`}
            >
              {open_now ? "Open" : "Closed"}
            </span>
          </div>
        )}
      </div>

      {/* Right Section: Map Button */}
      <a
        href={generateGoogleMapsLink(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 flex items-center justify-center bg-[#FFFFFF] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#FFFFFF] border border-[#4CAF50] rounded-md font-medium transition duration-300 ease-in-out px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
      >
        <MapPin className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
        Maps
      </a>
    </div>
  );
}
