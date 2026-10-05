import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0056D2",
          hover: "#0044A5",
          light: "#EBF3FE",
        },
        secondary: {
          DEFAULT: "#0A192F",
          light: "#172A45",
          dark: "#060E1A",
        },
        accent: {
          DEFAULT: "#E63946",
          hover: "#D62839",
          light: "#FDE8EA",
        },
        gold: "#F59E0B",
        live: "#10B981",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      boxShadow: {
        blue: "0 10px 20px -5px rgba(0, 86, 210, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
