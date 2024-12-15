import React from "react";

export function FoodResult () {
  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800">Restaurante Sugerido</h2>
      <p className="text-gray-600 mt-2">
        Aquí aparecerá el restaurante recomendado cerca de tu ubicación.
      </p>
    </div>
  );
};
