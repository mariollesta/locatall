import React from "react";

import Title from "@components/Title";
import { FoodRecommender } from "@components/FoodRecommender"
import { FoodResult } from "@components/FoodResult";
import Footer from "@components/Footer";

export function FoodRecommenderPage () {
  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-100">

      <Title />

      <FoodRecommender />

      <FoodResult />

      <Footer />

    </div>
  );
};

