/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
        float: "float 4s ease-in-out infinite",
        "flip-hourglass": "flip 1s ease-in-out infinite",
        ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        flip: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      colors: {
        primary: {
          light: "#ccd5e3", // Muted cool blue-gray
          DEFAULT: "#1e293b", // Slate-800: dark, elegant
          dark: "#0f172a", // Slate-900: pairs well with indigo
        },
        secondary: {
          light: "#7dd3fc", // Sky-300: soft and airy
          DEFAULT: "#f1f5f9", // Slate-100: off-white with a cool tone
          dark: "#334155", // Slate-700: cool and contrasty
        },
        accent: {
          light: "#818cf8",
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
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
