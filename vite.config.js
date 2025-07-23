import { defineConfig } from 'vite' // Função do Vite para tipagem e autocomplete da configuração
import react from '@vitejs/plugin-react' // Plugin oficial do React para o Vite


export default defineConfig({
  // Array de plugins que o Vite usa durante o build e desenvolvimento
  plugins: [react()], // Plugin do React ativado
  
  server: {
    port: 3000, 
    // Configurando o proxy para redirecionar requisições durante o desenvolvimento
    proxy: {
      // Todas as requisições que começam com '/api' serão redirecionadas para:
      '/api': {
        target: 'https://localhost:7283',
        
        // Configurações HTTPS
        changeOrigin: true, // Problemas de CORS: Muda o cabeçalho 'Origin' para corresponder ao target
        secure: false, // Desabilita verificação SSL (agora permite certificados auto-assinados)
        rejectUnauthorized: false, // Ignora erro de certificados SSL não autorizados (desenvolvimento local)
        agent: false, // Desabilita o agente HTTP padrão (Otimização para HTTPS local)

        // SISTEMA DE LOGS (Event Listeners do Proxy):

        // A função 'configure' é chamada quando o proxy é inicializado
        // Recebe 2 parâmetros: 'proxy' (instância do http-proxy-middleware) e 'options' (configurações do proxy)
        configure: (proxy, options) => {
          
          // EVENT LISTENER 1: 'error' - Captura erros durante o proxy e dispara resposta no log com a mensagem do erro
          proxy.on('error', (err, req, res) => {
            console.log('❌ Proxy Error:', err.message);
          });
          
          // EVENT LISTENER 2: 'proxyReq' - Captura requisições ENVIADAS para o backend
          // Disparado quando: Frontend faz requisição → Proxy → Backend
          // Parâmetros: proxyReq (requisição modificada), req (requisição original), res (resposta)
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('➡️  Proxy Request:', req.method, req.url, '→', options.target + req.url);
            // Exemplo de saída: "➡️  Proxy Request: POST /api/v1/auth/login → https://localhost:7283/api/v1/auth/login"
          });
          
          // EVENT LISTENER 3: 'proxyRes' - Captura respostas RECEBIDAS do backend
          // Disparado quando: Backend responde → Proxy → Frontend
          // Parâmetros: proxyRes (resposta do backend), req (requisição original), res (resposta final)
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('⬅️  Proxy Response:', proxyRes.statusCode, req.url);
            // Exemplo de saída: "⬅️  Proxy Response: 200 /api/v1/auth/login" ou "⬅️  Proxy Response: 401 /api/v1/auth/login"
          });
        }
      }
    }
  }
})
