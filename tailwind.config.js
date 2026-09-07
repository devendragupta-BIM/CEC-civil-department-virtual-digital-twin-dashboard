/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': '#040810',
        'bg-deep': '#070d1a',
        'bg-panel': '#0a1628',
        'bg-card': '#0d1d35',
        'accent-cyan': '#00d4ff',
        'accent-blue': '#0066ff',
        'accent-green': '#00ff88',
        'accent-amber': '#ffaa00',
        'accent-red': '#ff3355',
        'accent-purple': '#8855ff',
        'text-primary': '#e8f4ff',
        'text-secondary': '#7a9cc0',
        'text-dim': '#3d5a7a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
