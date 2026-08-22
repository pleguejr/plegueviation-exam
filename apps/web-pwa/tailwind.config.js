/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        binter: {
          green: '#008f45',
          greenLight: '#00a651',
          greenDark: '#006837',
          blue: '#004b87',
          blueLight: '#0284c7',
          blueDark: '#071426',
          sand: '#f59e0b',
          cloud: '#f4f8f6'
        },
        aviation: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a9f8',
          500: '#0e8de9',
          600: '#026fc7',
          700: '#0358a1',
          800: '#074b85',
          900: '#0c3f6e',
          950: '#06172e'
        },
        cockpit: {
          bg: '#071426',
          surface: '#0d1f38',
          surfaceHover: '#142c50',
          card: '#0f2442',
          border: '#1b3b68',
          borderHighlight: '#008f45',
          accent: '#00a651',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
          violet: '#8b5cf6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-binter': '0 0 20px -5px rgba(0, 143, 69, 0.4)',
        'glow-sky': '0 0 20px -5px rgba(56, 189, 248, 0.35)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'glow-rose': '0 0 20px -5px rgba(244, 63, 94, 0.4)',
        'glow-amber': '0 0 20px -5px rgba(245, 158, 11, 0.35)',
      }
    },
  },
  plugins: [],
}
