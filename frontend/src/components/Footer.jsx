import React from "react";
import { Github } from 'lucide-react';

const Footer = ({ githubLink }) => {
  return (
    <footer className="py-4 bg-[#251b5a] border-t border-[#E6E6FA] w-full">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-center">
        <div className="flex items-center text-[#FFFFFF] text-xs sm:text-sm font-semibold">
          <span>© {new Date().getFullYear()} locatall. Proyecto open source.</span>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFFFFF] hover:text-[#4CAF50] transition-colors duration-200 flex items-center ml-2"
            aria-label="View source on GitHub"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
