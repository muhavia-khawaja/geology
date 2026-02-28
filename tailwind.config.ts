import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      colors: {
        'rich-black': '#1A1A1D',
        'deep-plum': '#3B1C32',
        'vivid-purple': '#6A1E55',
        'rose-dust': '#A64D79',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        gravestone: {
          primary: '#6A1E55',
          secondary: '#A64D79',
          accent: '#3B1C32',
          neutral: '#1A1A1D',
          'base-100': '#1A1A1D',
          info: '#3B1C32',
          success: '#A64D79',
          warning: '#6A1E55',
          error: '#ff4d4d',

          '--rounded-box': '1rem',
          '--rounded-btn': '1.9rem',
          '--navbar-padding': '.5rem',
        },
      },
      'dark',
    ],
  },
}

export default config
