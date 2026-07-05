/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        romantic: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      colors: {
        midnight: {
          DEFAULT: '#050510',
          100: '#0a0a20',
          200: '#0f0f30',
          300: '#141440',
        },
        navy: {
          DEFAULT: '#0d1b3e',
          light: '#1a2f6e',
        },
        rose: {
          romantic: '#e91e8c',
          soft: '#f472b6',
          blush: '#fce7f3',
          deep: '#be185d',
        },
        gold: {
          warm: '#d4a853',
          light: '#f5cc7a',
          glow: '#ffd700',
        },
        purple: {
          deep: '#3b0764',
          mid: '#7c3aed',
          soft: '#a78bfa',
          light: '#c4b5fd',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift-left': 'driftLeft 8s linear infinite',
        'drift-right': 'driftRight 10s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'spin-slow': 'spin 20s linear infinite',
        'heart-beat': 'heartbeat 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'wax-crack': 'waxCrack 0.5s ease-out forwards',
        'petal-fall': 'petalFall 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(233,30,140,0.4), 0 0 40px rgba(233,30,140,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(233,30,140,0.8), 0 0 80px rgba(233,30,140,0.4)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.5)' },
        },
        driftLeft: {
          '0%': { transform: 'translateX(100vw) translateY(0) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateX(-100px) translateY(-200px) rotate(720deg)', opacity: '0' },
        },
        driftRight: {
          '0%': { transform: 'translateX(-100px) translateY(0) rotate(0deg)', opacity: '0.8' },
          '100%': { transform: 'translateX(100vw) translateY(-150px) rotate(-720deg)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        waxCrack: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(-5deg)' },
          '100%': { transform: 'scale(0) rotate(15deg)', opacity: '0' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) translateX(80px) rotate(360deg)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
