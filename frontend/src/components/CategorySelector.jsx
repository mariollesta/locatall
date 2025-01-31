import React from "react";
import { PLACES_DATA } from "@data/placesData";

export default function CategorySelector({ selectedCategory, onCategoryChange }) {

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(PLACES_DATA).map((categoryKey) => {
          const category = PLACES_DATA[categoryKey];
          return (
            <button
              key={categoryKey}
              onClick={() => onCategoryChange(categoryKey)} 
              className={`px-4 py-2 border border-white border-opacity-30 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === categoryKey
                  ? "bg-[#3f2d85] text-[#e6e6fa] shadow-md"
                  : "bg-[#f5f6fd] text-[#3f2d85] hover:bg-[#d1d1f5] hover:text-[#3f2d85]"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
