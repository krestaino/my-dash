module.exports = {
  theme: {
    extend: {}
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active'],
    display: ['dark']
  },
  plugins: [require('tailwindcss-dark-mode')()]
};
