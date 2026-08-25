import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          accent: '#0099FF',
          'accent-dark': '#0066CC',
        },
        surface: {
          primary: '#0F1419',
          secondary: '#1A1F26',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0A8B8',
        },
        border: '#2A3038',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['28px', { fontWeight: '700' }],
        h2: ['20px', { fontWeight: '700' }],
        h3: ['16px', { fontWeight: '600' }],
        body: ['14px', { fontWeight: '400' }],
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
}
export default config
