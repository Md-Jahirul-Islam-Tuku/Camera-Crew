/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#4764AE",

          "secondary": "#9274c9",

          "accent": "#dd5aba",

          "neutral": "#1C161D",

          "base-100": "#F7F7F8",

          "info": "#2E4AD6",

          "success": "#246224",

          "warning": "#F7D059",

          "error": "#DF2A5D",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
