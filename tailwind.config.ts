import type { Config } from "tailwindcss"

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#e5e7eb",
        muted: "#9ca3af",
        bg: "#0b0f14",
        card: "#111827",
        line: "#1f2937",
        accent: "#38bdf8"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    }
  },
  plugins: []
} satisfies Config