/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '20px',
      screens: {
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        white: {
          50: '#ffffff', // White Color
          100: '#fafafa',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#dedede',
          500: '#c2c2c2',
          600: '#979797',
          700: '#818181',
          800: '#606060',
          900: '#3c3c3c',
        },
        primary: {
          50: '##e3f2ff',
          100: '#bddeff',
          200: '#91cbff',
          300: '#63b6ff',
          400: '#42a5ff',
          500: '#2c95ff',
          600: '#3386ff',
          700: '#3573ef', // Primary Color
          800: '#3661dc',
          900: '#363fbc',
        },
      },
    },
  },
  plugins: [],
};
