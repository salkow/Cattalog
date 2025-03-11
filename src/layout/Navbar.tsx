import React, { useEffect, useState } from 'react';
import NavbarLink from './NavbarLink';
import ColorSchemeSelector from './ColorSchemeSelector';
import { NavLink, useLocation } from 'react-router';
import ClickAwayListener from '../components/ClickAwayListener';

const Navbar: React.FC = function () {
  const [ isMobileOpen, setIsMobileOpen ] = useState(false);
  const toggleMobileMenu = (): void => {
    setIsMobileOpen((prev) => {return !prev;});
  };

  useEffect(() =>{
    console.log('isMobileOpen:', isMobileOpen);
  }, [ isMobileOpen ]);

  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [ location ]);

  return (
    <nav className='bg-navbar border-gray-200 dark:bg-navbar-dark'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative'>
        <NavLink to='/' className='flex items-center space-x-3 rtl:space-x-reverse text-white'>
          <img src='/cat-logo.png' className='h-12 absolute' alt='Cattalog Logo' />
          <span className='ml-12 self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Cattalog</span>
        </NavLink>

        <div className='block md:hidden ml-auto mr-4'>
          <ColorSchemeSelector />
        </div>

        <ClickAwayListener enabled={ isMobileOpen } onClickAway={ () => {setIsMobileOpen(false);} }>
          <button
            type='button'
            onClick={ toggleMobileMenu }
            className='cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm
          dark:text-gray-500 text-white rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200
          dark:text-gray-400 dark:focus:ring-gray-600' aria-controls='navbar-default' aria-expanded={ isMobileOpen ? 'true' : 'false' }>
            <span className='sr-only'>Open main menu</span>
            <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15'/>
            </svg>
          </button>
          <div
            className={ `${ isMobileOpen ? 'visible' : 'hidden' } w-full md:block md:w-auto` }>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8
                        hrtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700 md:static dark:bg-navbar-dark bg-navbar
                        z-1 left-0 absolute w-[calc(100%-2rem)] left-[1rem] md:w-full'>
              <li>
                <NavbarLink url='/'>Cats</NavbarLink>
              </li>
              <li>
                <NavbarLink url='/breeds'>Breeds</NavbarLink>
              </li>
              <li>
                <NavbarLink url='/favourites'>Favourites</NavbarLink>
              </li>

              <li className='hidden md:block'>
                <ColorSchemeSelector />
              </li>
            </ul>
          </div>
        </ClickAwayListener>
      </div>
    </nav>
  );
};

export default Navbar;