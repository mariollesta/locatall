import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { UtensilsCrossed } from "lucide-react";

import { initialState, reducer, ACTIONS } from "@utils/foodRecommenderReducer";
import { getUserLocation, fetchRecommendations } from "@services/api";

import DistanceInput from "@components/DistanceInput";
import { ResetRecommender } from "@components/ResetRecommender";
import { FoodResult } from "@components/FoodResult";

export const FoodRecommender = ({ onError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const distanceOptions = useMemo(() => [
    { value: "1", label: "A menos de 1 km" },
    { value: "5", label: "A menos de 5 km" },
    { value: "10", label: "A menos de 10 km" },
  ], []);

  const handleFindPlace = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const { latitude, longitude } = await getUserLocation();
      const recommendations = await fetchRecommendations(latitude, longitude, state.distance * 1000);
      dispatch({ type: ACTIONS.SET_RECOMMENDATIONS, payload: recommendations });
    } catch (error) {
      const errorMessage = error.message || "";
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      onError(errorMessage); 
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.distance, onError]);

  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  useEffect(() => {
    if (state.showRecommendations) {
      document.getElementById('recommendations-header')?.focus();
    }
  }, [state.showRecommendations]);

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {!state.showRecommendations ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border-4 border-[#4CAF50]">
          <div className="p-6 sm:p-8">
            <UtensilsCrossed className="mx-auto mb-6 text-[#FFA500] animate-bounce" size={48} />
            <p className="text-[#333333] mb-8 text-center text-lg font-semibold">
              Encuentra los mejores sitios para comer
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
                  "¡Busca! 🍳"
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
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-[#FFFFFF]">
              {state.recommendations.length > 0
                ? `Top ${state.recommendations.length} recomendaciones`
                : "No se encontraron lugares cercanos :("}
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
              <div className="text-md sm:text-lg md:text-xl font-bold text-center text-white">
                Cambia la distancia de búsqueda o verifica tu ubicación
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
