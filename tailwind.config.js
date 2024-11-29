/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
            fontFamily: {
        sans: ['Montserrat', 'sans-serif'], // Add Montserrat as the default sans-serif font
      },

      colors: {
        // Hotel color palette
        hotel: {
          primary: "#C19A6B",  // Camel/Tan
          secondary: "#2C3E50", // Dark Slate Blue
          neutral: "#F2F2F2",   // Light Gray
        },
        // Restaurant color palette
        restaurant: {
          primary: "#E67E22",  // Bright Orange
          secondary: "#27AE60", // Fresh Green
          neutral: "#FFFFFF",   // White
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
