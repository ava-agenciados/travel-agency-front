// Importa o componente Router que gerencia as rotas da aplicação
import Router from "./routes/routes"
// Importa o AuthProvider que fornece contexto de autenticação para toda a aplicação
import { AuthProvider } from "./contexts/AuthContext"

// Componente principal da aplicação
function App() {

  return (
    // Envolve toda a aplicação com o AuthProvider para disponibilizar 
    // o contexto de autenticação em todos os componentes filhos
    <AuthProvider>
      {/* Renderiza o sistema de roteamento da aplicação */}
      <Router/>
    </AuthProvider>
  )
}

// Exporta o componente App como padrão
export default App
