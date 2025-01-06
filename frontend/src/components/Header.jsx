import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-gray-50 shadow-md py-4 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        {/* Navegation not available yet */}
        {/* 
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white hover:text-[#FFCDD2] transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#FFCDD2] transition-colors duration-200">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#FFCDD2] transition-colors duration-200">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        */}
      </div>
    </header>
  );
};

export default Header;

