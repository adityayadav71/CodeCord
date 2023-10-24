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
        lightSecondary: "#3c526c",
        accent1: "#0098FA",
        lightAccent1: "#43B5FF",
        accent2: "#576577",
        accent3: "#3C6392",
        accent4: "#212A35",
        greenBackGround: "#294D35",
        easyGreen: "#19EB48",
        mediumYellow: "#E2BC1E",
        yellowBackGround: "#5E4E26",
        hardRed: "#FF0000",
        redBackGround: "#5a302f81",
        graphicLightBlue: "#0064FA",
        graphicDarkBlue: "#0E5BCE",
        grey1: "#A1ACBD",
        grey2: "#D9D9D9",
        grey3: "#3E4756",
        black20: "rgba(0, 0, 0, 0.2)",
        transparent: "rgba(0, 0, 0, 0)",
        hover: "rgba(60, 99, 146, 0.3)",
        lightAccent3: "rgba(60, 99, 146, 0.37)",
        lightPrimary: "#222B3A",
        transparentSecondary: "rgba(40, 54, 71, 0.37)",
        tagYellowBg: "rgba(215, 129, 0, 0.37)",
        glass: "rgba(60, 99, 146, .15)",
      },
    },
    boxShadow: {
      feature1: "0px 0px 54px 45px #0098FA",
      feature2: "0px 0px 54px 45px #19EB48",
      feature3: "0px 0px 54px 45px #E2BC1E",
      signUp: "0px 1px 10px 0px #0098FA",
      dropDown: "0px 4px 30px rgba(0, 0, 0, 0.25)",
      heavyDropDown: "0px 5px 5px rgba(0, 0, 0, 0.5)",
      heading: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      modal: "0px 0px 1400px 2560px rgba(0, 0, 0, 0.5);",
    },
    animation: {
      load: "load 2s ease-in-out infinite",
      fadeIn: "fadeIn 0.5s ease-out forwards",
      openModal: "openModal 0.2s ease-in-out forwards",
      closeModal: "closeModal 0.2s ease-in-out forwards",
      grow: "grow 2s ease-out forwards",
      slideOutDelayed: "slideOut 0.5s 0.1s ease-out forwards",
      slideOut: "slideOut 0.5s ease-out forwards",
      slideUp: "slideUp 0.5s ease-out forwards",
      expandBorder: "expandBorder 0.5s ease-in-out forwards",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
    },
    keyframes: {
      grow: { "0%": { height: "0%" }, "100%": { height: "100%" } },
      fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      pulse: {
        "0%, 100%": {
          opacity: 1,
        },
        "50%": {
          opacity: 0.3,
        },
      },
    },
    display: ["group-hover"],
  },
  plugins: [],
};
