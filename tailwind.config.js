/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        bg: "url('/images/bg.png')",
      },
      boxShadow: {
        main: "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
      screens: {
        sm: "480px",
      },
    },
  },
  plugins: [],
};
