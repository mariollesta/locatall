import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating, open_now }) {
  const generateGoogleMapsLink = (restaurantName) => {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${encodeURIComponent(restaurantName)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#E0E0E0] hover:border-[#4CAF50] transition-all duration-300 transform hover:scale-105">
      <div className="p-4 flex items-center justify-between">
        {/* Left: Restaurant Info Button */}
        <div className="flex">
          <div>
            <h3 className="text-lg font-bold text-[#FFA500]">{name}</h3>
            {rating && (
              <div className="flex items-center mt-1 text-[#333333]">
                <Star className="w-4 h-4 text-[#FFA500] mr-1" />
                <span className="font-semibold text-[#333333] mr-2">{rating}</span>
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-[#FFFFFF] text-xs font-bold ${
                    open_now ? "bg-[#4CAF50] text-white" : "bg-[#FF4C4C] text-white"
                  }`}
                >
                  {open_now ? "Abierto" : "Cerrado"}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Right: Map Button */}
        <div className="flex items-center">
          <a
            href={generateGoogleMapsLink(name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#FFFFFF] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-[#FFFFFF] border border-[#4CAF50] rounded-lg font-medium transition duration-300 ease-in-out px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Maps
          </a>
        </div>
      </div>
    </div>
  );
}
