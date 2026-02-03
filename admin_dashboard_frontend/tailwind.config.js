/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Retro theme colors
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
        },
        accent: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
        },
        retro: {
          orange: '#ff6b35',
          pink: '#ff006e',
          purple: '#8338ec',
          blue: '#3a86ff',
          yellow: '#ffbe0b',
        },
        background: '#f9fafb',
        surface: '#ffffff',
        text: {
          DEFAULT: '#111827',
          secondary: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'retro': '4px 4px 0px rgba(0, 0, 0, 0.1)',
        'retro-lg': '8px 8px 0px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}
