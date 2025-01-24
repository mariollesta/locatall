import axios from "axios";

// Auxiliary function: Get user location
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Tu navegador no soporta geolocalización."));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("Permiso de geolocalización denegado."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("La ubicación no está disponible."));
              break;
            case error.TIMEOUT:
              reject(new Error("El tiempo de espera para obtener la ubicación ha expirado."));
              break;
            default:
              reject(new Error("No se pudo obtener la ubicación. Por favor, inténtalo de nuevo."));
              break;
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  });
};

// Auxiliary function: API request
export const fetchRecommendations = async (latitude, longitude, radius, place_type) => {
  const response = await axios.get("/api/foodplaces", {
    params: {
      lat: latitude,
      lng: longitude,
      radius,
      type: place_type
    },
  });
  return response.data.data;
};
