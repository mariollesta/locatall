import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-[#333333] border-t border-[#4CAF50] w-full">
      <div className="container mx-auto px-4 text-center text-[#FFFFFF] text-xs sm:text-sm font-semibold">
          © {new Date().getFullYear()} gotoeat. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
