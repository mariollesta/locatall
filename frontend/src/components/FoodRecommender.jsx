import React from "react";

export function FoodRecommender () {
  return (
    <section className="py-8 text-center">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all"
        onClick={() => alert("Buscando ubicación...")}
      >
        Encuentra un restaurante cercano 🍴
      </button>
    </section>
  );
};
