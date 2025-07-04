/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5D5EC2',
        secondary: '#7F0EEB',
        accent: '#05AFF2',
        pink: '#E47CF1',
        purple: '#D6A9DF',
        dark: '#381273',
        darkPurple: '#5C2071',
        cyan: '#05F2DB',
        violet: '#743088',
      },
      fontFamily: {
        'title': ['NanumGothicCoding', 'monospace'],
        'base': ['Mina', 'serif'],
      },
    },
  },
  plugins: [],
};