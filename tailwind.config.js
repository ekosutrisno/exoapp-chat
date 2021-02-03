module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily:{
         exoapp:['Quicksand', 'sans-serif']
      },
      colors: {
        whatsapp: {
          'teal-green': '#056162',
          'light-green': '#25D366',
          'teal-green-dark': '#075E54',
          'dark-100': '#2D3134',
          'dark-200': '#262D31',
          'dark-300': '#131C21',
          'blue': '#34B7F1',
          'blue-dark': '#085373',
          'yellow':'#F5C536'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
