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
        midnight: {
          950: '#04070D',
          900: '#080C16',
          850: '#0C1322',
          800: '#111A2E',
          750: '#16223D',
          700: '#1E2C4D',
          600: '#2A3C66',
          500: '#3D548C',
          400: '#5874B5',
          300: '#7E9AE0',
          200: '#ADC0F0',
          100: '#DDE5FA',
        },
        brand: {
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15), transparent 70%)',
        'card-glow': 'radial-gradient(circle at top left, rgba(139, 92, 246, 0.12), transparent 50%)',
      }
    },
  },
  plugins: [],
}
