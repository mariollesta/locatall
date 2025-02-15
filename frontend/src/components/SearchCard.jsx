import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { UtensilsCrossed, Footprints, Compass, MapPinned } from "lucide-react";

import { PLACES_DATA } from "@data/placesData";
import { initialState, reducer, ACTIONS } from "@utils/recommenderReducer";
import { getUserLocation, fetchRecommendations } from "@services/api";

import CategorySelector from "@components/CategorySelector";
import OptionGroup from "@components/OptionGroup";
import { ResetSearch } from "@components/ResetSearch";
import { ResultCard } from "@components/ResultCard";

export const SearchCard = ({ onError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const distanceOptions = useMemo(
    () => [
      { value: "1", label: "A menos de 1 km", icon: Footprints },
      { value: "5", label: "A menos de 5 km", icon: MapPinned },
      { value: "15", label: "A menos de 15 km", icon: Compass },
    ],
    []
  );

  const placeTypeOptions = useMemo(() => {
    return PLACES_DATA[state.category]?.placeTypes || [];
  }, [state.category]);

  const handleCategoryChange = (newCategory) => {
    const firstPlaceType = PLACES_DATA[newCategory]?.placeTypes?.[0].value;
  
    console.log("Categoria seleccionada:", newCategory);
    console.log("Primer placeType encontrado:", firstPlaceType);
  
    dispatch({
      type: ACTIONS.SET_CATEGORY_AND_PLACE_TYPE,
      payload: {
        category: newCategory,
        placeType: firstPlaceType || "", 
      },
    });
  };
  
  

  const handleFindPlace = useCallback(async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.SET_ERROR, payload: null });

    try {
      const { latitude, longitude } = await getUserLocation();
      const recommendations = await fetchRecommendations(
        latitude,
        longitude,
        state.distance * 1000,
        state.category,
        state.placeType
      );
      dispatch({ type: ACTIONS.SET_RECOMMENDATIONS, payload: recommendations });
    } catch (error) {
      const errorMessage = error.message || "";
      dispatch({ type: ACTIONS.SET_ERROR, payload: errorMessage });
      onError(errorMessage);
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  }, [state.distance, state.category, state.placeType, onError]);

  const handleReset = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  
  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      {!state.showRecommendations && (
        <CategorySelector 
          selectedCategory={state.category} 
          onCategoryChange={handleCategoryChange}
       />
      )}

      {!state.showRecommendations ? (
        <div className="bg-white bg-opacity-30 border border-white border-opacity-30 shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* <UtensilsCrossed className="mx-auto mb-6 text-[#3f2d85] animate-bounce" size={48} /> */}
            {state.error && <div className="text-red-500 mb-4">{state.error}</div>}

            <OptionGroup
              header="¿Qué tipo de lugar estás buscando?"
              name="placeType"
              options={placeTypeOptions}
              selected={state.placeType || placeTypeOptions[0]?.value || ""}
              onChange={(value) =>
                dispatch({
                  type: ACTIONS.SET_CATEGORY_AND_PLACE_TYPE,
                  payload: { category: state.category, placeType: value }, 
                })
              }
            />

            <OptionGroup
              header="¿Cómo de lejos?"
              name="distance"
              options={distanceOptions}
              selected={state.distance}
              onChange={(value) =>
                dispatch({ type: ACTIONS.SET_DISTANCE, payload: value })
              }
            />

            <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleFindPlace}
                disabled={state.isLoading}
                className={`${
                  state.isLoading
                    ? "cursor-not-allowed opacity-50"
                    : "bg-[#7e71e1] hover:scale-105"
                } text-[#FFFFFF] rounded-xl shadow-md px-6 py-3 font-bold text-lg transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-opacity-50 flex items-center justify-center`}
              >
                {state.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-lg animate-spin mr-3"></div>
                    Buscando...
                  </>
                ) : (
                  "¡Busca!"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-[#5940c1] font-bold text-center mb-6 ">
              {state.recommendations.length > 0
                ? `Top ${state.recommendations.length} recomendaciones`
                : "No se encontraron lugares cercanos :("}
            </h2>
            {state.recommendations.length > 0 ? (
              state.recommendations.map((place, index) => (
                <ResultCard
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

          <div className="mt-8 text-center">
            <ResetSearch resetSearch={handleReset} />
          </div>
        </>
      )}
    </div>
  );
};