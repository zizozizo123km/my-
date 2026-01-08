import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", href: "/shop/new" },
      { name: "Best Sellers", href: "/shop/best" },
      { name: "Categories", href: "/shop/categories" },
      { name: "Sale", href: "/shop/sale" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping & Returns", href: "/shipping" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialIcons = [
  { Icon: Facebook, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Linkedin, href: "#" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          
          {/* Column 1: Branding and Contact */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
              E-Store
            </h3>
            <p className="text-sm text-gray-600 max-w-xs">
              The best place to find high-quality products delivered right to your door.
            </p>
            
            <div className="space-y-2 pt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>support@estore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-indigo-500 mt-1" />
                <span>123 Commerce St, Suite 100, City, Country</span>
              </div>
            </div>
          </div>

          {/* Columns 2, 3, 4: Navigation Links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-indigo-600 transition duration-150"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media and Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          
          {/* Social Icons */}
          <div className="flex space-x-4 order-2 md:order-1 mt-6 md:mt-0">
            {socialIcons.map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition duration-150"
                aria-label={`Link to ${Icon.name}`}
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          {/* Copyright Text */}
          <p className="text-sm text-gray-500 order-1 md:order-2">
            &copy; {currentYear} E-Store Inc. All rights reserved.
          </p>

          {/* Payment Icons (Placeholder for production) */}
          <div className="flex space-x-2 order-3 mt-6 md:mt-0">
            <img src="https://via.placeholder.com/40x25?text=Visa" alt="Visa" className="h-6 rounded" />
            <img src="https://via.placeholder.com/40x25?text=MC" alt="Mastercard" className="h-6 rounded" />
            <img src="https://via.placeholder.com/40x25?text=Amex" alt="Amex" className="h-6 rounded" />
            <img src="https://via.placeholder.com/40x25?text=PayPal" alt="PayPal" className="h-6 rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;