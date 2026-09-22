/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      colors: {
        sg: {
          bg: "var(--sg-bg)",
          surface: "var(--sg-surface)",
          elevated: "var(--sg-elevated)",
          primary: "var(--sg-primary)",
          accent: "var(--sg-accent)",
          text: "var(--sg-text)",
          muted: "var(--sg-muted)",
          border: "var(--sg-border)",
          success: "var(--sg-success)",
          warning: "var(--sg-warning)",
          danger: "var(--sg-danger)",
          info: "var(--sg-info)"
        }
      },

      fontFamily: {
        sans: ["Instrument Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"]
      },

      borderRadius: {
        sg: "12px",
        "sg-lg": "16px",
        "sg-xl": "22px"
      }
    }
  },

  plugins: []
};