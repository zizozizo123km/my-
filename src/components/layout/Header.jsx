import React, { useState } from 'react';

// --- Icon Definitions (Simplified for production readiness without external dependencies) ---

const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const XIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const ShoppingBagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.263a4.875 4.875 0 01-1.28.518l-.207.07a1.5 1.5 0 00-.897 1.355v6.217c0 .554.449 1.003 1.003 1.003h5.494c.554 0 1.003-.449 1.003-1.003v-6.217a1.5 1.5 0 00-.897-1.355l-.207-.07a4.875 4.875 0 01-1.28-.518z" />
  </svg>
);

// --- Navigation Links Data ---
const navLinks = [
  { name: 'الرئيسية', href: '/' },
  { name: 'المتجر', href: '/shop' },
  { name: 'التصنيفات', href: '/categories' },
  { name: 'العروض', href: '/deals' },
  { name: 'تواصل معنا', href: '/contact' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Placeholder for cart item count
  const cartItemCount = 3;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavItem = ({ href, name }) => (
    <a
      href={href}
      className="text-gray-700 hover:text-indigo-600 transition duration-150 font-medium px-3 py-2 rounded-md"
    >
      {name}
    </a>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="text-3xl font-extrabold text-indigo-700 tracking-tighter">
              E-Shop
            </a>
          </div>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex md:space-x-1 lg:space-x-4 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <NavItem key={link.name} href={link.href} name={link.name} />
            ))}
          </nav>

          {/* Action Icons & Mobile Toggle */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Search Icon (Desktop/Mobile) */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Search"
            >
              <SearchIcon className="h-6 w-6" />
            </button>

            {/* Profile Icon (Desktop/Mobile) */}
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="User Profile"
            >
              <UserIcon className="h-6 w-6" />
            </button>

            {/* Cart Icon (Desktop/Mobile) */}
            <a
              href="/cart"
              className="relative p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Shopping Cart with ${cartItemCount} items`}
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[20px] h-[20px] ring-2 ring-white">
                  {cartItemCount}
                </span>
              )}
            </a>

            {/* Mobile Menu Button (Visible only on mobile) */}
            <button
              type="button"
              className="md:hidden p-2 text-gray-500 hover:text-indigo-600 transition duration-150 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={toggleMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (Conditional Rendering) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-t border-gray-100 z-40" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;