import React from "react";

export function ResetRecommender ({ resetSearch }) {
    return (
        <button
            onClick={resetSearch}
            className="text-[#FFFFFF] hover:text-[#FFA500] border-[#FFFFFF] hover:border-[#FFA500] font-semibold bg-transparent hover:bg-[#FFFFFF] px-6 py-3 rounded-lg border-2 transition duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:ring-opacity-50"
        >
            Busca de nuevo! 🔍
        </button>
    );
};