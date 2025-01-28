import React, { useState } from "react";
import { CATEGORY_MAPPINGS } from "@utils/categoryMappings";

export default function CategorySelector({ onCategoryChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category); // Notify the parent component of the selected category
  };

  return (
    <div>
      {/* Category buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.keys(CATEGORY_MAPPINGS).map((categoryKey) => {
          const category = CATEGORY_MAPPINGS[categoryKey];
          return (
            <button
              key={categoryKey}
              onClick={() => handleCategoryClick(categoryKey)}
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
