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
        sans: ["var(--font-familjen-grotesk)", "var(--body)", "sans-serif"],
        display: ["var(--font-familjen-grotesk)", "var(--display)", "sans-serif"],
        body: ["var(--font-familjen-grotesk)", "var(--body)", "sans-serif"],
        mono: ["var(--font-familjen-grotesk)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
