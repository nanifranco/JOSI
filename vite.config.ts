import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Publicado en GitHub Pages como sitio de proyecto: https://josi-makeup-mx.github.io/josi-makeup-mx/
  base: '/josi-makeup-mx/',
  plugins: [react(), tailwindcss()],
})
