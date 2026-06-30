import type { Config } from "tailwindcss";

const config: Config = {
  // Only the hiring-assistant files use Tailwind utilities. Marketing files use
  // plain CSS and contribute no classes, so they cost nothing here.
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── ARNOBOT light design system ──────────────────────────────
        canvas: "#F4F7FC", // page background (soft blue-white)
        surface: "#FFFFFF", // cards / panels
        surfaceAlt: "#EEF3FA", // subtle fills, table headers, hover
        line: "#E4E9F2", // hairline borders
        line2: "#D3DCEA", // stronger borders
        ink: "#141A33", // primary text / headings (near-navy black)
        body: "#3E4869", // body text
        muted: "#6E7894", // secondary / helper text
        // brand
        navy: "#230C75", // ARNOBOT primary indigo/navy
        navy2: "#180953", // hover / deeper
        steel: "#375E9D", // ARNOBOT steel-blue accent
        brightblue: "#2F62C4", // links / focus
        // semantic
        ok: "#15A34A",
        okbg: "#E9F7EE",
        bad: "#DC2626",
        badbg: "#FCEBEB",
        warn: "#B45309",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,64,0.04), 0 8px 24px rgba(16,24,64,0.06)",
        pop: "0 12px 34px rgba(35,12,117,0.12)",
        btn: "0 8px 18px rgba(35,12,117,0.22)",
        nav: "0 1px 0 rgba(16,24,64,0.06)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      keyframes: {
        pop: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fade: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        pop: "pop 0.3s cubic-bezier(0.22,1,0.36,1)",
        fade: "fade 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
