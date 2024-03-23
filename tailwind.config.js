/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 调整路径以适应您的项目结构
  ],
  theme: {
    extend: {
      strokeWidth: {
        '3': '3px',
        '4': '4px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '1/2': '1 / 2',
        '2/1': '2 / 1',
      },
      cursor:{
        leftArrow: 'url("/public/assets/left-arrow.png"),progress',
        rightArrow: 'url("/public/assets/right-arrow.png"),progress',
      },
      height: {
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '176': '44rem',
        '208': '52rem',
      },
      colors:{
        'oliver-green':'#747d60'
      },
      keyframes: {
        slideAndShrink: {
          '0%': {
            transform: 'translateY(-50px) scale(1.5)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          }
        },
        expandAndRise: {
          '0%': {
            transform: 'translateY(50px) scale(0)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          }
        },
        slideIn: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0)'
          }
        },
      },
      animation: {
        slideIn: 'slideIn 2s ease forwards',
        fadeIn: 'fadeIn 2s ease-in-out forwards',
        'fade-out': 'fadeOut 2s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'slide-and-shrink': 'slideAndShrink 2s ease forwards',
        'expand-and-rise': 'expandAndRise 2.5s ease-out forwards',
      },
      fontFamily: {
        custom: ['content', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

