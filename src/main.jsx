// Importa o StrictMode do React para detectar problemas em desenvolvimento
import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import store from './store/store';
// Importa createRoot para renderização moderna do React 18+
import { createRoot } from 'react-dom/client'
// Importa os estilos globais da aplicação
import './index.css'
// Importa o componente principal da aplicação
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
