/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#B9D5FD',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        slateDark: '#172B4D',
        slateMuted: '#64748B',
        slateBorder: '#E7EDF4',
        cardBg: '#FFFFFF',
        appBg: '#F8FAFC',
        amberBadge: '#FFF4E5',
        amberText: '#B86A13',
        greenBadge: '#EAF8F1',
        greenText: '#168567',
        purpleBadge: '#F2F0FF',
        purpleText: '#8060C2',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)',
        'modal': '0 20px 40px -15px rgba(15, 23, 42, 0.15)',
        'float': '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
      }
    },
  },
  plugins: [],
}
