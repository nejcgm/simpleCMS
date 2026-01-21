/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      fontFamily: {
        itcfranklinnormal :['itcfranklinnormal'],
        itcfranklinbold : ['itcfranklinbold'],
        dentonlight : ['dentonlight'],
     },
     aspectRatio: {
      '4/3': '4 / 3',
    },
    caretColor: {
      black: '#000000',
    },

    
    },
  },
  plugins: [],
};

