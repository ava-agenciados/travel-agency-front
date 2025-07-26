// Importa o hook personalizado para acessar contexto de autenticação
import { useAuth } from '../../hooks/useAuth'

/**
 * Componente de Rota Protegida
 * Controla o acesso baseado nas roles do usuário
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  
  // Desestrutura dados e funções do contexto de autenticação
  const { isAuthenticated, isLoading, user, hasRole } = useAuth()

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {/* Spinner animado para indicar carregamento */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    window.location.href = '/login'
    return null // Retorna null para não renderizar nada durante o redirecionamento
  }

  // Se não tiver permissão para acessar a rota (role inadequado)
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          {/* Ícone de aviso */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          {/* Mensagem de erro */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Negado</h2>
          <p className="text-gray-600 mb-4">
            Você não tem permissão para acessar esta área.
          </p>
          {/* Informações do usuário atual */}
          <p className="text-sm text-gray-500 mb-6">
            Usuário: {user?.email} | Papel: {user?.role}
          </p>
          {/* Botões de navegação */}
          <div className="space-x-4">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Ir para Início
            </button>
            <button
              onClick={() => window.history.back()}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Se tudo estiver ok (autenticado e com role adequado), renderiza o componente filho
  return children
}

// Exporta o componente como padrão
export default ProtectedRoute
