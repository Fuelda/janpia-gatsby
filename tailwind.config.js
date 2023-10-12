/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    screens: {
      lg: { max: "1020px" },
      md: { max: "480px" },
    },
    extend: {
      colors: {
        red: {
          base: "#CC0000",
          pale: "#FFF2F2",
          kyushu: "#C95B78",
          okinawa: "#E08A89",
        },
        orange: { chugoku: "#E28C3A" },
        blue: {
          base: "#EFF3FB",
          button: "#165D94",
          font: "#457DA9",
          fdo: "#5DAEEC",
          pale: "#EEF1F4",
          link: "#004992",
          hokuriku: "#3D72AF",
          kanto: "#66B9D6",
          vivid: "#0090FF",
          link: "#1F4D9C",
        },
        green: { ado: "#6ACE6C", kinki: "#AAC25C", tokai: "#5DA052" },
        purple: { hokkaido: "#A065A0", tohoku: "#666EAE" },
        yellow: { shikoku: "#EED44E" },
        black: { font: "#333333" },
        gray: {
          border: "#7F8E99",
          base: "#666666",
          black: "#999999",
          font: "#AFBAC3",
          pale: "#EEEEEE",
          subtle: "#CCCCCC",
        },
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
