import React from "react";

export function ResetRecommender ({ resetSearch }) {
    return (
        <button
            onClick={resetSearch}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 text-[#FFFFFF] hover:text-[#FF9000] border-[#FFFFFF] hover:border-[#FF9000] font-semibold bg-transparent hover:bg-[#FFFFFF] text-sm sm:text-base"
        >
            Busca de nuevo! 🔍
        </button>
    );
};