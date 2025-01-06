import React from 'react';
import { UtensilsCrossed } from 'lucide-react'; 

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <UtensilsCrossed className="w-8 h-8" />
      <span className="ml-2 text-xl font-semibold">gotoeat</span>
    </div>
  );
};

export default Logo;
