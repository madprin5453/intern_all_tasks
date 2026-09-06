/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        carbon: {
          DEFAULT: "#14120F",
          light: "#1D1B17",
          lighter: "#27241F",
          border: "#332F28",
        },
        bone: {
          DEFAULT: "#F5F1EA",
          muted: "#A79E92",
          dim: "#736C61",
        },
        ember: {
          DEFAULT: "#FF5A36",
          dark: "#D6431F",
          light: "#FF8161",
        },
        brass: {
          DEFAULT: "#C9A227",
          light: "#E0BE4E",
        },
        success: "#4CAF7D",
        danger: "#E5484D",
      },
      fontFamily: {
        display: ["'Sora'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "scale-in": {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(16px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.16,1,.3,1) both",
        "fade-in": "fade-in .5s ease both",
        "scale-in": "scale-in .25s cubic-bezier(.16,1,.3,1) both",
        "slide-in-right": "slide-in-right .35s cubic-bezier(.16,1,.3,1) both",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,90,54,0.4), 0 8px 30px -8px rgba(255,90,54,0.35)",
        "glow-brass": "0 0 0 1px rgba(201,162,39,0.45), 0 8px 30px -8px rgba(201,162,39,0.35)",
      },
    },
  },
  plugins: [],
};
