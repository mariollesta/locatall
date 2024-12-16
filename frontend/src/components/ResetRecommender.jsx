import React from "react";

export function ResetRecommender ({ resetSearch }) {
    return (
        <button
            onClick={resetSearch}
            className="bg-blue-500 text-white rounded-lg shadow-md px-6 py-3 font-medium hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            Reiniciar busqueda
        </button>
    );
};