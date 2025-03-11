import React from 'react';

const Pill: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span className='bg-blue-100 dark:text-white text-blue-800 text-sm
    font-medium me-2 px-3.5 py-1.5 rounded-full dark:bg-blue-900'>
      { children }
    </span>
  );
};

export default Pill;