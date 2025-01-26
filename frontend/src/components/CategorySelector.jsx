import React from "react";

const categories = [
  "food",
  "entertainment",
  "shopping",
  "services & transport",
  "public spaces",
];

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full border border-white border-opacity-30 text-sm font-semibold transition-all duration-300
            ${
              selectedCategory === category
                ? "bg-[#3f2d85] text-white shadow-md"
                : "bg-[#dbdbf9] text-[#3f2d85] hover:bg-[#d1d1f5] hover:text-[#3f2d85]"
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
