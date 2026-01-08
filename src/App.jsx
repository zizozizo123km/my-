import React from 'react';

// --- Helper Components ---

/**
 * Renders the main navigation header for the e-commerce site.
 * Features: Sticky positioning, responsive navigation, and cart/user icons.
 */
const Header = () => (
  <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      {/* Logo/Branding */}
      <a href="/" className="text-3xl font-extrabold text-indigo-700 tracking-tight transition duration-300 hover:text-indigo-900">
        E-Commerce Pro
      </a>

      {/* Primary Navigation (Desktop) */}
      <nav className="hidden md:flex space-x-8 text-lg font-medium">
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-200 border-b-2 border-transparent hover:border-indigo-600 pb-1">Home</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-200 border-b-2 border-transparent hover:border-indigo-600 pb-1">Shop</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-200 border-b-2 border-transparent hover:border-indigo-600 pb-1">Categories</a>
        <a href="#" className="text-gray-600 hover:text-indigo-600 transition duration-200 border-b-2 border-transparent hover:border-indigo-600 pb-1">Contact</a>
      </nav>

      {/* Action Icons (User & Cart) */}
      <div className="flex items-center space-x-4">
        {/* User Icon */}
        <button aria-label="User Account" className="p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
        </button>

        {/* Cart Icon */}
        <button aria-label="Shopping Cart" className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          {/* Cart Item Count Badge */}
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full ring-2 ring-white">
            3
          </span>
        </button>

        {/* Mobile Menu Button */}
        <button aria-label="Toggle Menu" className="md:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </div>
  </header>
);

/**
 * Renders a compelling hero section for immediate user engagement.
 */
const HeroSection = () => (
  <section className="bg-gradient-to-r from-indigo-50 to-white py-24 sm:py-32">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
        Unleash Your Style. <span className="text-indigo-600 block sm:inline">Shop Smarter.</span>
      </h2>
      <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
        Explore curated collections of the highest quality goods, delivered with speed and exceptional service.
      </p>
      <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl text-xl font-semibold shadow-2xl shadow-indigo-300 hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50">
        Explore New Arrivals
      </button>
    </div>
  </section>
);

/**
 * Renders a placeholder for featured products using a responsive grid layout.
 */
const FeaturedProducts = () => (
    <section className="container mx-auto px-4 py-16">
        <h3 className="text-4xl font-bold text-gray-800 mb-10 text-center">
            Top Picks This Week
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product Card Placeholder (repeated 4 times) */}
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-1">
                    <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">
                        Product Image {i}
                    </div>
                    <div className="p-5">
                        <h4 className="text-lg font-semibold text-gray-800 truncate">Premium Item Name {i}</h4>
                        <p className="text-indigo-600 font-bold text-xl mt-1">$99.99</p>
                        <button className="mt-4 w-full bg-indigo-500 text-white py-2 rounded-lg text-sm hover:bg-indigo-600 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

/**
 * Renders the site footer with copyright information.
 */
const Footer = () => (
  <footer className="bg-gray-900 text-white mt-auto">
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
        <div>
          <h5 className="font-bold text-lg mb-4 text-indigo-400">Company</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Careers</a></li>
            <li><a href="#" className="hover:text-white transition">Press</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-lg mb-4 text-indigo-400">Support</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition">Shipping Info</a></li>
            <li><a href="#" className="hover:text-white transition">Returns</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-lg mb-4 text-indigo-400">Legal</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
            <h5 className="font-bold text-lg mb-4 text-indigo-400">Stay Connected</h5>
            <p className="text-sm text-gray-400">Subscribe to our newsletter for exclusive deals.</p>
            {/* Newsletter Placeholder */}
            <div className="mt-3 flex">
                <input type="email" placeholder="Your Email" className="p-2 rounded-l-lg text-gray-900 w-full focus:ring-indigo-500 focus:border-indigo-500" />
                <button className="bg-indigo-600 p-2 rounded-r-lg hover:bg-indigo-700 transition">
                    Join
                </button>
            </div>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} E-Commerce Pro. Built with React & Tailwind CSS.
      </div>
    </div>
  </footer>
);

// --- Main Application Component ---

/**
 * The root component defining the overall layout of the e-commerce application.
 */
export default function App() {
  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        {/* Future Router Outlet or additional sections will be placed here */}
      </main>
      
      <Footer />
    </div>
  );
}