/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define a primary color palette based on a modern, appealing theme (e.g., deep blue/teal)
        primary: {
          DEFAULT: '#007BFF', // A vibrant blue
          light: '#66AFFF',
          dark: '#0056b3',
          '50': '#E6F0FF',
          '100': '#B3D7FF',
          '200': '#80BFFF',
          '300': '#4D9FFF',
          '400': '#1A7FFF',
          '500': '#007BFF',
          '600': '#006ADF',
          '700': '#0056b3',
          '800': '#00428C',
          '900': '#002E66',
        },
        // Define a secondary color for accents (e.g., a contrasting orange/amber)
        secondary: {
          DEFAULT: '#FFC107', // Amber/Gold
          light: '#FFD54F',
          dark: '#FFA000',
        },
        // Define success, danger, and warning colors
        success: '#28A745',
        danger: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        // Neutral palette for text and backgrounds
        background: '#F8F9FA', // Light grey background
        surface: '#FFFFFF',    // White card/surface color
        text: {
          DEFAULT: '#212529', // Dark text
          light: '#6C757D',   // Muted text
        }
      },
      fontFamily: {
        // Use a modern, clean sans-serif font stack
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        // Optionally, define a display font for headings
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        // Custom shadows for elevation and depth
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'md-light': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'lg-soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      }
    },
  },
  plugins: [
    // Recommended plugins for modern web development
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}