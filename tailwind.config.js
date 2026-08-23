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
          100: '#FFF9F0', // Main Warm Cream Background
          200: '#FDF1DC',
          300: '#FBE6C2',
        },
        primary: {
          50: '#F2FDF5',
          100: '#DCFCE7',
          600: '#16A34A',
          800: '#166534',
          900: '#14532D', // Deep Green
          950: '#092E16',
        },
        secondary: {
          50: '#FFF7ED',
          500: '#F97316', // Vibrant Orange
          600: '#EA580C',
          700: '#C2410C',
        },
        accent: {
          400: '#FACC15', // Yellow / Gold
          500: '#EAB308',
        },
        dark: {
          900: '#17211F', // Custom Text Dark Slate Green
          800: '#23312E',
          700: '#344743',
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
