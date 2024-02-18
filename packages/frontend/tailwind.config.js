/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class',
  mode: 'jit',
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '500': '500ms',
      },
    },
  },
  variants: {
    extend: {
      width: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionProperty: ['responsive', 'hover', 'focus'],
      transitionDuration: ['responsive', 'hover', 'focus'],
      transitionTimingFunction: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

