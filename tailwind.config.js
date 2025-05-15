/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#016f4a",
        secondary: "#e9fff7",
        grey: "#8A898D",
        darkgrey: "#797C86",
        yellow: "#F8BA18",
        cardgreen: "#016F4AB2",
        story: "#D5FAFC",
        footer: "#016F4A33"
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "#016f4a"
          }
        },
      },
      animation: {
        typing1: "typing 4s steps(50) infinite alternate, blink .10s infinite",
        typing2: "typing 4s steps(35) infinite alternate, blink .5s infinite",
      }
    },
  },
  plugins: [],
};
