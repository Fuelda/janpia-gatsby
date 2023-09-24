/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        red: {
          base: "#CC0000",
        },
        blue: {
          base: "#EFF3FB",
          button: "#165D94",
          font: "#457DA9",
          fdo: "#5DAEEC",
          pale: "#EEF1F4",
          link: "#004992",
        },
        green: { ado: "#6ACE6C" },
        black: { font: "#333333" },
        gray: { border: "#7F8E99" },
      },
      borderRadius: {
        50: "50px",
        30: "30px",
        20: "20px",
        10: "10px",
      },
    },
  },
  plugins: [],
};
