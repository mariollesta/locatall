import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const Logo = () => {
  return (
    <div className={"flex items-center"}>
      <UtensilsCrossed className="w-8 h-8" style={{ color: '#4CAF50' }} />
      <span className="ml-2 text-xl font-semibold" style={{ color: '#FFA500' }}>gotoeat</span>
    </div>
  );
};

export default Logo;

