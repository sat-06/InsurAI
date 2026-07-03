import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";


const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#09090B",
        surface: "#0F0F12",
        card: "#18181B",
        border: "#27272A",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#F8FAFC",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#22C55E",
          foreground: "#052E16",
        },
        error: {
          DEFAULT: "#EF4444",
          foreground: "#FEF2F2",
        },
        muted: {
          DEFAULT: "#27272A",
          foreground: "#A1A1AA",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
        "gradient-accent": "linear-gradient(135deg, #22C55E 0%, #06B6D4 100%)",
        "gradient-radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(37,99,235,0.20) 0%, rgba(9,9,11,0) 60%)",
        "gradient-mesh":
          "radial-gradient(at 20% 20%, rgba(37,99,235,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(6,182,212,0.12) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(34,197,94,0.10) 0px, transparent 50%)",
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0,0,0,0.4)",
        glow: "0 0 0 1px rgba(37,99,235,0.15), 0 8px 32px -8px rgba(37,99,235,0.35)",
        "glow-accent": "0 0 0 1px rgba(34,197,94,0.15), 0 8px 32px -8px rgba(34,197,94,0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 30px -12px rgba(0,0,0,0.6)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "spin-slow": "spin-slow 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
