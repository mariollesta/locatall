import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-200 w-full">
      <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} FoodFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
