export const COLORS = {
  primary: "#fff",
  secondary: "#444",
  "secondary-2": "#666",
  tertiary: "#F7F7F7",
  error: "#DA1414",
  "error-2": "#FEEFEF",
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: COLORS,
    },
  },
  plugins: [],
};
