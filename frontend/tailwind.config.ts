import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      primary_color: "#E3366C",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
