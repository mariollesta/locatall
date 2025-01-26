import React from "react";

export function ResetSearch ({ resetSearch }) {
    return (
        <button
            onClick={resetSearch}
            className="inline-flex items-center justify-center h-10 px-4 py-2 bg-[#3f2d85] border border-[#FFFFFF] rounded-lg shadow-lg text-[#f5f6fd] font-semibold text-sm sm:text-basebg-transparent hover:bg-[#e6e6fa] hover:text-[#4a35a2]"
        >
            Busca de nuevo! 🔍
        </button>
    );
};