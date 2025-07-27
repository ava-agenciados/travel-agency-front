import { defineConfig } from 'vite' // Função do Vite para tipagem e autocomplete da configuração
import react from '@vitejs/plugin-react' // Plugin oficial do React para o Vite


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
  }
})
