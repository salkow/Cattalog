import React from 'react';
import Navbar from './Navbar';

const Layout: React.FC<React.PropsWithChildren> = function ({ children }) {
  return (
    <div className='bg-layout dark:bg-layout-dark min-h-screen'>
      <Navbar/>
      <div className='max-w-7xl max-h-auto ml-auto mr-auto mt-4 px-2'>
        {children}
      </div>
    </div>
  );
};

export default Layout;