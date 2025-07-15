/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      colors: {
        footer: "var(--color-footer-link)",
      },
    },
  },
  plugins: [],
};
