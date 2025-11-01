/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
  extend: {
    colors: {
      brand: {
        lilac: "#A78BFA",        // soft violet
        lilacHover: "#8B5CF6",
      },
      surface: "#111827",        // dark surface
      card: "#1F2937",           // darker card
      text: "#F9FAFB",
      muted: "#9CA3AF"
    },
    fontFamily: {
      inter: ["Inter", "Poppins", "system-ui", "sans-serif"],
    },
  },
},

  plugins: [require("@tailwindcss/forms")],
};
