/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        primary: {
          light: '#1f1f1f',
          dark: '#f1f1f1',
        },
        secondary: {
          light: '#202124',
          dark: '#202124',
        },
        background: {
          light: '#f8f9fa',
          dark: '#f8f9fa',
        },
      },
    },
  },
  plugins: [],
};
