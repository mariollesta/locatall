import React, { useState } from "react";

import Navbar from "@components/Navbar";
import Title from "@components/Title";
import { FoodRecommender } from "@components/FoodRecommender"
import ErrorMessage from "@components/ErrorMessage";
import Footer from "@components/Footer";

const GITHUB_LINK = "https://github.com/mariollesta/gotoeat";

export function FoodRecommenderPage () {

  const [error, setError] = useState(null);

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffc71b] text-[#333333]">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Title />
        {error ? (
          <ErrorMessage message={error} />
        ) : (
          <FoodRecommender onError={handleError} />
        )} 
      </main>
      <Footer githubLink={GITHUB_LINK}/>
    </div>
  );
};

