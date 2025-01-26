import React from 'react';
import { Compass } from 'lucide-react';

const Logo = () => {
  return (
    <div className={"flex items-center"}>
      <Compass className="w-6 h-6" style={{ color: '#3f2d85' }} />
      <span className="ml-2 text-xl font-semibold" style={{ color: '#3f2d85' }} lang="en">locatall</span>
    </div>
  );
};

export default Logo;
