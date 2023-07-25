/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        golemblue: "#0c14d4",
        primary: "#181ea9",
        secondary: "#f6f8fc",
        pociejGray: "rgb(225, 226, 230)",
      },
    },
  },
  plugins: [],
};
