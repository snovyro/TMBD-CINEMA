/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#050E12",
        gray: "#B6B6B6",
        "nav-blue": "#0EA5E9",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
