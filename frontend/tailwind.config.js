/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "375px",
        xs: "450px",
        mobileWide: { min: "426px", max: "767px" },
        // Au-delà, le conteneur de 1296px est centré : les gouttières deviennent inutiles
        wide: "1360px",
      },
      colors: {
        // Fond clair unique sur tout le site, ponctué de rouge
        cream: "#16130f",
        ink: "#f5f2ec",
        accent: "#d6301f",
        frame: "#e6e0d5",
        muted: "#CAC4B7",
        subtle: "#9a9184",
        faint: "#8b8375",
      },
      fontSize: {
        mini: "16px",
        label: "18px",
        note: "20px",
      },
      fontFamily: {
        archivo: ["Archivo Black", "system-ui", "sans-serif"],
        space: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
