import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.json",
  ],
  theme: {
    extend: {
      keyframes: {
        arrowSlide: {
          "0%": { transform: "translateX(0)" },
          "30%, 100%": { transform: "translateX(8px)" },
        },
      },
      animation: {
        "arrow-slide": "arrowSlide 2s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--display)"],
        body: ["var(--body)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
