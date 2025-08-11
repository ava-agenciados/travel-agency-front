import { defineConfig } from 'vite' // Função do Vite para tipagem e autocomplete da configuração
import react from '@vitejs/plugin-react' // Plugin oficial do React para o Vite


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://localhost:8080',
        changeOrigin: true,
        secure: false,
        rejectUnauthorized: false,
        agent: false,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('❌ Proxy Error:', err.message);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('➡️  Proxy Request:', req.method, req.url, '→', options.target + req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('⬅️  Proxy Response:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
})
