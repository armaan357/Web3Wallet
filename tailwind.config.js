/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      boxShadow: {
        'md' : '0px 2px 3px #0003',
        'lg' : '0px 4px 8px rgb(0, 0, 0, 0.1)',
        'box' : '0px 0px 30px #7b35b51e'
      },
      backgroundImage: {
        'custom-gradient-dark': "linear-gradient(290deg, rgba(27,1,47,1) 0%, rgba(8,12,19,1) 99%)",
        'custom-gradient-light': "[#faf5f9]",
      },
    }
  },
  plugins: [],
}

// linear-gradient(290deg, rgba(195,180,203,1) 0%, rgba(244,244,249,0.9) 99%)