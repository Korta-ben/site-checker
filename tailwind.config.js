module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'status-green': '#9AFF98',
        'status-yellow': '#FDFF88',
        'status-orange': '#FF5E48',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
