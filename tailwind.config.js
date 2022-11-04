/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif"
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      colors: {
        gray: {
          900: "#121214",
          800: "#202024",
          600: "#323238",
          300: "#8D8D99",
          100: "#C4C4CC"
        },

        yellow: {
          500: "#F7DD43",
          700: "#E5CD3D",
        },

        ignite: {
          500: "#129E57",
        }
      }
    },
  },
  plugins: [],
}
