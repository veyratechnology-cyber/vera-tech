import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VeyraTech Brand Colors - Navy + Orange System
        primary: {
          DEFAULT: "#0D2340",
          dark: "#081A30",
        },
        secondary: {
          DEFAULT: "#FC8436",
          hover: "#E5702A",
          glow: "rgba(252, 132, 54, 0.20)",
          bg: "rgba(252, 132, 54, 0.10)",
        },
        "primary-dark": "#081A30",
        "secondary-hover": "#E5702A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#E5E5E5",
        "text-muted": "#CCCCCC",
        success: "#34C77B",
        border: "rgba(255, 255, 255, 0.10)",
        
        // Keep legacy colors for backward compatibility (will be phased out)
        royal: {
          navy: "#081426",
          secondary: "#0F1B2D",
          blue: "#2563EB",
          electric: "#3B82F6",
          cyan: "#06B6D4",
          purple: "#8B5CF6",
        },
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        'secondary-glow': '0 0 20px rgba(252, 132, 54, 0.20)',
        'secondary-lg': '0 10px 30px rgba(252, 132, 54, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
