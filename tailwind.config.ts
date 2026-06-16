import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#2f241d",
        cinnabar: "#9f3f2f",
        gold: "#c8943f",
        paper: "#f8f1e5",
        muted: "#746458",
      },
      boxShadow: {
        card: "0 18px 60px rgba(75, 47, 31, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
