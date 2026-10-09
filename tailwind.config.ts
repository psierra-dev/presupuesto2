import type { Config } from "tailwindcss";
import defaultTheme  from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        mobilemain: 'calc(100vh - 74px)'
      },
      minHeight: {
        mobilemain: 'calc(100vh - 74px)'
      },
      animation: {
        'slideIn': 'slidein .3s linear forwards',
        'slideOut': 'slideout .3s linear forwards'
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'translateY(-100vh)', opacity: '0 '},
          '100%': { transform: 'translateY(0)', opacity:' 1' },
        },
        slideout: {
          '0%': { transform: 'translateY(0)', opacity: '1 '},
          '100%': { transform: 'translateY(-100vh)', opacity:'0' },
        }
      },
  },
  plugins: [],
  }
};
export default config;
