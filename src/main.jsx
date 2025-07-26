// Importa o StrictMode do React para detectar problemas em desenvolvimento
import { StrictMode } from 'react'
// Importa createRoot para renderização moderna do React 18+
import { createRoot } from 'react-dom/client'
// Importa os estilos globais da aplicação
import './index.css'
// Importa o componente principal da aplicação
import App from './App.jsx'

// Cria a raiz da aplicação React no elemento HTML com id 'root'
// e renderiza a aplicação envolvida em StrictMode para debugging
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
