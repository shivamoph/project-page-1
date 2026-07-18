import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "#4F46E5",
          emerald: "#10B981",
          slate: "#334155",
          bg: "#F8FAFC"
        }
      },
      boxShadow: {
        premium: "0 24px 60px -28px rgba(51, 65, 85, 0.45)"
      }
    }
  },
  plugins: []
};

export default config;
