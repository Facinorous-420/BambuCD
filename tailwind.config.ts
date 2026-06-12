import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // xkcd-style palette
        link: "#0000ee",
        linkVisited: "#551a8b",
        bambu: "#00ae42", // Bambu Lab green accent
      },
      fontFamily: {
        // xkcd uses a plain serif/sans system stack
        sans: ["Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
