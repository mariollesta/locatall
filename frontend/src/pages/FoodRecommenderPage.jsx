import React from "react";

import Title from "@components/Title";
import { FoodRecommender } from "@components/FoodRecommender"
import Footer from "@components/Footer";

export function FoodRecommenderPage () {
  return (
    <div className="min-h-screen flex flex-col  items-center bg-gray-50">
      
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <Title />
        <div className="max-w-md w-full">
          <FoodRecommender />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

