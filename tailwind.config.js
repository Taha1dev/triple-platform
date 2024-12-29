/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#000',
        secondary: '#fff',
        variant: "#0056B3"
      },
      fontFamily: {
        monoScape: ['"Source Code Pro"', "sans-serif"],
        paytone: ['"Paytone One"', "sans-serif"],
      },
      backgroundImage: {
        'hero-pattern': "url('/banner.png')",
        'blur-pattern': "url('blob-blur.png')"
      }
    },
  },
  plugins: [],
}

