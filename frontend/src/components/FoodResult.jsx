import React from "react";
import { MapPin, Star } from "lucide-react";

export function FoodResult({ name, rating, icon}) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow-md overflow-hidden p-4">

      {/* Imagen del restaurante */}
      {/*
      <div className="w-16 h-16 rounded-md mr-4 overflow-hidden">
        {icon ? (
          <img 
            src={icon} 
            alt={`Ícono de ${name}`} 
            className="w-full h-full object-contain bg-gray-100" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>
      
      
      {/* Detalles del restaurante */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        {rating && (
          <div className="flex items-center mt-1 text-yellow-500">
            <Star className="w-4 h-4 mr-1" />
            <span>{rating}</span>
          </div>
        )}
      </div>
      
      {/* Botón de mapa */}
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
