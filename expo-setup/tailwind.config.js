// tailwind.config.js for Expo + Nativewind Setup
module.exports = {
  // Specify paths to all component files in your Expo project
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        girmaic: {
          sand: "#E5D3B3", // Warm Sand / Alabaster
          terracotta: "#CD5C5C", // Indian Red
          gold: "#DAA520", // Honey Goldenrod
          carbon: "#0d0d0d", // Dark charcoal base
          carbonLight: "#161616"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrainsMono", "monospace"]
      }
    }
  },
  plugins: []
};
