/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'default': '0px 1px 2px 0px #1018280A',
      },
      padding: {
        '3.5': '14px',
      },
      colors: {
        "gray-100": "#D0D5DD",
        "gray-200": "#EAECF0",
        "gray-400": "#667085",
        "gray-500": "#475467",
        "gray-700": "#101828",
        "pure-pink-100": "#FFF0F7",
        "pure-pink-200": "#FFD3E7",
        "pure-pink-400": "#D0005E",
        "pure-pink-500": "#CB005B",
      },

    },
  },
  plugins: [],
}
