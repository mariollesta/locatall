import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import { Utensils } from "lucide-react";

import DistanceInput from "@components/DistanceInput";
import { ResetRecommender } from "@components/ResetRecommender";
import { FoodResult } from "@components/FoodResult";

// Definir acciones para el reducer
const ACTIONS = {
  SET_DISTANCE: "SET_DISTANCE",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_LOCATION: "SET_LOCATION",
  SET_RECOMMENDATIONS: "SET_RECOMMENDATIONS",
  RESET: "RESET",
};

// Reducer para gestionar el estado del componente
const initialState = {
  distance: "1",
  isLoading: false,
  error: null,
  location: null,
  recommendations: [],
  showRecommendations: false,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DISTANCE:
      return { ...state, distance: action.payload };
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: action.payload };
    case ACTIONS.SET_RECOMMENDATIONS:
      return {
        ...state,
        recommendations: action.payload,
        showRecommendations: true,
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
}

// Función auxiliar: Obtener la ubicación del usuario
const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("Tu navegador no soporta geolocalización.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        () => reject("No se pudo obtener la ubicación. Por favor, inténtalo nuevamente."),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  });
};

// Función auxiliar: Realizar la petición a la API
const fetchRecommendations = async (latitude, longitude, radius) => {
  const response = await axios.get("http://localhost:8000/api/restaurants", {
    params: {
      lat: latitude,
      lng: longitude,
      radius,
    },
  });
  return response.data.data;
};

export const FoodRecommender = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const distanceOptions = [
    { value: "1", label: "A menos de 1 km" },
    { value: "5", label: "A menos de 5 km" },
    { value: "10", label: "A menos de 10 km" },
  ];

  const handleFindPlace = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      // Obtener ubicación
      const { latitude, longitude } = await getUserLocation();

      // Realizar la petición a la API
      const recommendations = await fetchRecommendations(
        latitude,
        longitude,
        state.distance * 1000
      );

      dispatch({ type: ACTIONS.SET_RECOMMENDATIONS, payload: recommendations });
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: error.message || "Error al obtener los datos.",
      });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET });
    setVisibleIndexes([]); // Reinicia las animaciones
  };


  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {!state.showRecommendations ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 border-4 border-[#4CAF50]">
          <div className="p-6 sm:p-8">
            <Utensils className="mx-auto mb-6 text-[#FFA500] animate-bounce" size={48} />
            <p className="text-[#333333] mb-8 text-center text-lg font-semibold">
              Encuentra los mejores lugares para comer
            </p>
            {state.error && <div className="text-red-500 mb-4">{state.error}</div>}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-center text-[#4CAF50]">
                ¿Cómo de lejos?
              </h3>
              <div className="flex flex-col space-y-2">
                {distanceOptions.map((option) => (
                  <DistanceInput
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    selected={state.distance}
                    onChange={(value) =>
                      dispatch({ type: ACTIONS.SET_DISTANCE, payload: value })
                    }
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleFindPlace}
                disabled={state.isLoading}
                className={`${
                  state.isLoading
                    ? "cursor-not-allowed opacity-50 bg-gradient-to-r from-[#FFA500] to-[#4CAF50]"
                    : "bg-gradient-to-r from-[#FFA500] to-[#4CAF50] hover:from-[#FF9000] hover:to-[#45a049] hover:scale-105"
                } text-[#FFFFFF] rounded-2xl px-6 py-3 font-bold text-lg transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-50 flex items-center justify-center`}
              >
                {state.isLoading ? (
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
        </div>
      ) : (
        <>
          <div className="mb-8 text-center">
            <ResetRecommender resetSearch={handleReset} />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#FFFFFF] shadow-text">
              {state.recommendations.length > 0
                ? `Top ${state.recommendations.length} recomendaciones`
                : "No se encontraron lugares cercanos"}
            </h2>
            {state.recommendations.length > 0 ? (
              state.recommendations.map((place, index) => (
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
