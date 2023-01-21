/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['inter', 'serif'],
      },
      colors: {
        primary: '#1E2023',
        secondary: '#283647',
        accent1: '#0098FA',
        accent2: '#576577',
        easyGreen: '#19EB48',
        mediumYellow: '#E2BC1E',
        hardRed: '#FF0000',
        graphicLightBlue: '#0064FA',
        graphicDarkBlue: '#0E5BCE',
        grey1: '#A1ACBD',
        grey2: '#D9D9D9',
      }
    },
  },
  plugins: [],
};
