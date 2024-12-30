import React from "react";

import Title from "@components/Title";
import { FoodRecommender } from "@components/FoodRecommender"
import Footer from "@components/Footer";

export function FoodRecommenderPage () {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#ffa500] to-[#fff5c5] text-[#333333]">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Title />
        <FoodRecommender /> 
      </main>
      <Footer />
    </div>
  );
};

