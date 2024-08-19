import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#eff4fc',
        primary: '#1877f2',
        like: '#ff4154',
        icon: '#708090',
      },
    },
  },
  plugins: [],
};
export default config;
