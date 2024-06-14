/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'default': '0px 1px 2px 0px #1018280A',
      },
      padding: {
        '3.5': '14px',
      },
      colors: {
        "gray-100": "#D0D5DD",
        "gray-400": "#667085",
        "gray-500": "#475467",
        "pure-pink": "#D0005E",
        "pure-pink-500": "#A2034B"
      }
    },
  },
  plugins: [],
}
