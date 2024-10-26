import { ListChecks } from 'lucide-react';
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <ListChecks size={30} color="#004cff" />
      <h1 className="font-bold text-3xl ">FocusList</h1>
    </div>
  );
};

export default Logo;