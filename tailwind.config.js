/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#F3F7F4', // Main Soft Sage Background
          200: '#E4EEE8',
          300: '#D3E3D9',
        },
        primary: {
          50: '#EFF8F5',
          100: '#D9EEE7',
          600: '#168277',
          800: '#17655E',
          900: '#12524D', // Deep Teal
          950: '#0B3835',
        },
        secondary: {
          50: '#FFF2EF',
          500: '#E46952', // Coral Action Color
          600: '#D65340',
          700: '#B64334',
        },
        accent: {
          400: '#F2BD55', // Warm Amber
          500: '#DFA13A',
        },
        dark: {
          900: '#1E2D2B', // Custom Text Slate
          800: '#2D3E3B',
          700: '#42534F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(20, 83, 45, 0.06), 0 2px 6px -1px rgba(23, 33, 31, 0.04)',
        'card': '0 10px 30px -5px rgba(20, 83, 45, 0.08)',
        'glow': '0 0 25px rgba(249, 115, 22, 0.25)',
      }
    },
  },
  plugins: [],
}
