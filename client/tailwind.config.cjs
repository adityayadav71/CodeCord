/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["inter", "serif"],
      },
      colors: {
        primary: "#1E2023",
        secondary: "#283647",
        accent1: "#0098FA",
        accent2: "#576577",
        easyGreen: "#19EB48",
        mediumYellow: "#E2BC1E",
        hardRed: "#FF0000",
        graphicLightBlue: "#0064FA",
        graphicDarkBlue: "#0E5BCE",
        grey1: "#A1ACBD",
        grey2: "#D9D9D9",
        featureGradient1: "linear-gradient(0deg, rgba(0, 152, 250, 1) 0%, rgba(25, 235, 72, 1) 100%)",
        featureGradient2: "linear-gradient(0deg, rgba(25, 235, 72, 1) 0%, rgba(226, 188, 30, 1) 100%);",
        featureGradient3: "linear-gradient(0deg, rgba(0, 152, 250, 1) 0%, rgba(30, 32, 35, 1) 100%);",
      },
    },
    boxShadow: {
      feature1: "0px 4px 23px 2px #0098FA;",
      feature2: "0px 0px 45px 54px #19EB48;",
      feature3: "0px 0px 45px 54px #E2BC1E;",
    },
  },
  plugins: [],
};
