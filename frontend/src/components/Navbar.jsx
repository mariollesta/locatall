import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <header className="bg-gray-50 shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Navbar;

