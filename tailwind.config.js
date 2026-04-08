/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#171417',
        ivory: '#FBF8F3',
        'ivory-deep': '#F5EFE7',
        bloom: {
          DEFAULT: '#D4A0A0',
          light: '#E8C4C4',
          muted: '#B08080',
        },
        coral: '#C9B8D4',
        sunflower: '#A8C5B0',
        sky: '#8FB5A0',
        lavender: '#B0A0BA',
        'spring-green': '#607D67',
        'off-white': '#FAF7F2',
        charcoal: '#242024',
        ash: '#85786D',
        petal: '#F2E6DD',
        dark: {
          DEFAULT: '#0A0A0D',
          card: '#111116',
          surface: 'rgba(17, 17, 22, 0.82)',
          deep: 'rgba(10, 10, 13, 0.94)',
        },
        muted: {
          DEFAULT: '#B2A79A',
          light: '#D4CCBF',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Infant', 'serif'],
        script: ['var(--font-script)', 'Great Vibes', 'cursive'],
        body: ['var(--font-body)', 'Cormorant Infant', 'serif'],
        sans: ['var(--font-body)', 'Cormorant Infant', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      animation: {
        float: 'floatCard 6s ease-in-out infinite',
        'float-delayed': 'floatCard 6s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floatCard: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backgroundImage: {
        'bloom-gradient': 'linear-gradient(135deg, #171417 0%, #D4A0A0 100%)',
        'bloom-gradient-full': 'linear-gradient(135deg, #171417 0%, #D4A0A0 48%, #A8C5B0 100%)',
        'teal-gradient': 'linear-gradient(135deg, #A8C5B0 0%, #D4A0A0 100%)',
      },
    },
  },
  plugins: [],
};
