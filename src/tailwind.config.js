/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Esta línea es crucial!
  ],
  theme: {
    extend: {
      // Puedes añadir aquí la paleta de colores LAI para no usar valores directos si lo deseas
      colors: {
        'lai-dark': '#4A4A4A',
        'lai-medium': '#6E6E6E',
        'lai-light': '#F5F3EE',
        'lai-background': '#FBFAF7',
      },
      // También puedes definir la fuente Inter si aún no está en tu proyecto
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}