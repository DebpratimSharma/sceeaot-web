import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "ink-muted": "var(--ink-muted)",
        line: "var(--line)",
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
