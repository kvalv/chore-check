import daisyui from "daisyui";
// typography tai
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          "--rounded-btn": "0.2rem",
          ".btn": {
            "font-weight": "400",
          },
          ".select": {
            // outline-none
            outline: "2px solid transparent",
            "outline-offset": "2px",
          },
        },
      },
    ],
  },
  plugins: [typography, forms, daisyui],
};
