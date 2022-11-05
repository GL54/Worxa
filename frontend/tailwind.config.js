const { FaTrailer } = require("react-icons/fa");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gradientColorStops: (theme) => ({
        primary: "#FF8C00",
        secondary: "#FFA500",
        danger: "#FFD700",
      }),
    },
    backgroundImage: {
      sbk: "url('../src/components/icon/sbk.jpg')",
      test: "linear-gradient(90deg, #337cd5 0%, #66db9f 100%)",
    },
    variants: {
      extend: {},
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
