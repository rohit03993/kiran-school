/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#0F7A34",
          deep: "#0A5A26",
          soft: "#1C9A48",
        },
        ink: "#333333",
        gold: "#FFD700",
        mist: "#F3F6F4",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 16px 40px rgba(51, 51, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
