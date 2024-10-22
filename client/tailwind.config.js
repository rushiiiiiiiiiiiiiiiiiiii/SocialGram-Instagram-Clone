/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      scrollbarHide: {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '&': {
          'scrollbar-width': 'none', // For Firefox
        },
      },
      colors: {
        loww : 'hsl(252,30%,93%)',
        // black: '#000000',
        // white: '#ffffff',
      },
    },
  },
  plugins: []
};
