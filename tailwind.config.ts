import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/componets/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Jeton Primary Colors
        jeton: {
          pink: "#FF4D6A",
          coral: "#FF9B7A",
          peach: "#FFB88C",
          red: "#FF3B30",
          "red-dark": "#E02020",
          orange: "#FF6B4A",
          green: "#22C55E",
          "green-dark": "#16A34A",
          "green-light": "#4ADE80",
        },
        // Extended color palette
        green: {
          50: "#F2FEF5",
          100: "#E0FDEA",
          200: "#C1FBD6",
          300: "#9BF9C0",
          400: "#22C55E",
          500: "#16A34A",
          600: "#15803D",
          700: "#166534",
          800: "#14532D",
          900: "#052E16",
        },
        // Neutral colors
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          950: "#0A0A0A",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #22C55E 0%, #4ADE80 50%, #86EFAC 100%)",
        "nav-gradient": "linear-gradient(90deg, #22C55E 0%, #16A34A 100%)",
        "green-gradient": "linear-gradient(180deg, #22C55E 0%, #16A34A 100%)",
        "card-pink": "linear-gradient(135deg, #FFE5EC 0%, #FFC2D1 100%)",
        "card-green": "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
        "card-blue": "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 0.5s infinite",
        "float-slow": "float 4s ease-in-out infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "card": "0 10px 30px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 20px 40px rgba(0, 0, 0, 0.15)",
        "button": "0 4px 14px rgba(255, 59, 48, 0.3)",
        "button-hover": "0 6px 20px rgba(255, 59, 48, 0.4)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
