// components/NavBar.tsx
import Menu from '@/layout/menu.component';
import React, { useState } from 'react';
import Link from 'next/link'

function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLinkClick = () => {
    setShowMobileMenu(false);
  };


  return (
    <nav className=" bg-gradient-to-tl from-purple-700 to-pink-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 border-b border-solid border-sky-200">
        <div className="flex-shrink-0 font-bold tracking-wider text-pink-300">
          <Link legacyBehavior href="/">
            <a>Wear It</a>
          </Link>
        </div>
        <div className="hidden md:block">
          <Menu onLinkClick={handleLinkClick} />
        </div>
        <button
          type="button"
          className="md:hidden bg-gradient-to-tl from-purple-700 to-pink-500 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white    focus:text-white transition duration-150 ease-in-out"
          onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <svg
            className="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="md:hidden">
        {showMobileMenu && (
          <Menu onLinkClick={handleLinkClick} />
        )}
      </div>
    </nav>
  );
}

export default NavBar;
