import React from 'react';
import { NavLink } from 'react-router';

interface INavbarLink {
  url: string
  children: React.ReactNode
}

const NavbarLink: React.FC<INavbarLink> = function ({ url, children }) {
  const defaultClassnames = 'block py-2 px-3 rounded-sm md:border-0 md:p-0';

  const activeClassnames = `${ defaultClassnames } text-indigo-700 dark:text-blue-500 font-bold`;
  const inactiveClassnames = `${ defaultClassnames } md:hover:text-indigo-700 md:dark:hover:text-blue-500 text-white`;

  return (
    <NavLink
      to={ url }
      className={ ({ isActive }) => {
        return isActive ? activeClassnames : inactiveClassnames;
      }
      }
    >
      { children }
    </NavLink>
  );
};

export default NavbarLink;