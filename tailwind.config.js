/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#48859d",
          DEFAULT: "#264653",
          dark: "#101e23",
          text: "#101e23",
        },
        secondary: {
          light: "#36c9b8",
          DEFAULT: "#2a9d8f",
          dark: "#1b655c",
          text: "#e7ffef",
        },

        accent: {
          light: "#e9c46a",
          DEFAULT: "#f4a261",
          dark: "#9CA3AF",
          text: "#9ca3af",
        },
        neutral: {
          lightest: "#f5f5f5",
          light: "#e0e0e0",
          DEFAULT: "#9e9e9e",
          dark: "#616161",
          darkest: "#212121",
        },
        success: {
          light: "#a5d6a7",
          DEFAULT: "#4caf50",
          dark: "#2e7d32",
        },
        alert: {
          light: "#ffe5e5", // Soft red/pink for background
          DEFAULT: "#f44336", // Bright red for main alert
          dark: "#b71c1c", // Deep red for borders or emphasis
          text: "#3c0d0d", // Dark red-brown text for contrast
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
