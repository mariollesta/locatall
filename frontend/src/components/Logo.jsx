import React from "react";
import { Compass } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center text-xl font-semibold" style={{ color: "#3f2d85" }}>
      <span>l</span>
      <Compass className="w-4 h-4" />
      <span>catall</span>
    </div>
  );
};

export default Logo;

