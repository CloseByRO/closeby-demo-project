import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage:      '#7a9e87',
        'sage-d':  '#4d7a5e',
        'sage-l':  '#f0f5f2',
        'sage-xl': '#e4eee8',
        clay:      '#c4865a',
        'clay-l':  '#f9f0e9',
        ink:       '#1a2018',
        'ink-m':   '#3d4a3a',
        'ink-l':   '#6b7868',
        'ink-xl':  '#a8b4a5',
        cream:     '#faf8f4',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
