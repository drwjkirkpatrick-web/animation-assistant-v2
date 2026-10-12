/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#0a1f3d',
          mid: '#103a5e',
          surf: '#1b6a8c',
          foam: '#4fc3d1',
          glow: '#7fdce8',
        },
        sand: {
          DEFAULT: '#f4e4c1',
          warm: '#e8d09b',
        },
        coral: {
          DEFAULT: '#ff6b6b',
          soft: '#ff8e8e',
        },
        reef: {
          green: '#2ec4b6',
        },
        ink: {
          DEFAULT: '#0d1b2a',
          soft: '#2a3f5f',
        },
        sea: {
          text: '#e8f4f8',
          muted: '#8eb2c4',
        },
      },
      fontFamily: {
        display: ['system-ui', '-apple-system', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 4s ease-in-out infinite',
        'rise': 'rise 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        rise: {
          '0%': { bottom: '-20px', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.6' },
          '100%': { bottom: '105vh', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
