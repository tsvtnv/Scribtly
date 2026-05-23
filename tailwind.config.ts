import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7F77DD",
          light: "#EEEDFE",
          dark: "#3C3489",
          onDark: "#9D96E8",
        },
        success: "#1D9E75",
        warning: "#BA7517",
        danger: "#E24B4A",
        neutral: {
          bg: "#F1EFE8",
        },
        text: {
          primary: "#2C2C2A",
          secondary: "#5F5E5A",
        },
        dark: {
          base: "#1A1A1A",
          elevated: "#252523",
          input: "#2E2E2C",
          border: "rgba(255, 255, 255, 0.08)",
          text: "#F1EFE8",
          muted: "#A3A19C",
        },
        platform: {
          youtube: { bg: "#FAECE7", text: "#4A1B0C", border: "#F0997B" },
          tiktok: { bg: "#2C2C2A", text: "#F1EFE8", border: "#5F5E5A" },
          reels: { bg: "#FBEAF0", text: "#4B1528", border: "#ED93B1" },
          linkedin: { bg: "#E6F1FB", text: "#042C53", border: "#85B7EB" },
          podcast: { bg: "#EEEDFE", text: "#26215C", border: "#AFA9EC" },
        },
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      borderWidth: {
        hair: "0.5px",
      },
      keyframes: {
        shimmer: {
          from: { transform: "translateX(-220%) rotate(12deg)" },
          to:   { transform: "translateX(700%) rotate(12deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
