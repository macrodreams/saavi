/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        sg: {
          bg: "#07090e",
          surface: "#0e1118",
          elevated: "#111827",
          primary: "#7ec8cc",
          accent: "#2b7fff",
          text: "#eceff3",
          muted: "#90a1b9",
          border: "#1b2434",
          success: "#4eae76",
          warning: "#bb4d00",
          danger: "#fb2c36",
          info: "#51a2ff"
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
