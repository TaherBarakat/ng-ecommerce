/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4da6ff",
          DEFAULT: "#0078d4",
          dark: "#005a9e",
        },
        secondary: {
          light: "#f8bbd0",
          DEFAULT: "#e91e63",
          dark: "#c2185b",
        },
        accent: {
          light: "#ffecb3",
          DEFAULT: "#ffc107",
          dark: "#ff8f00",
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
