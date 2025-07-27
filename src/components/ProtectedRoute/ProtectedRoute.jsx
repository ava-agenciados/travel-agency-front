import { useAuth } from '../../hooks/useAuth'; // hook para acessar o contexto de autenticação
import { useNavigate } from 'react-router-dom'; // hook useNavigate do React Router para navegação


/**
 * Componente de Rota Protegida
 * Controla o acesso baseado nas roles do usuário
 */

// Allowed roles é um array que define quais roles têm acesso a esta rota
// Children são os componentes que serão renderizados se a autenticação e roles estiverem corretas

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate(); // Hook de navegação do React Router
  // navigate é usado para redirecionar o usuário para outra rota
  // UseAuth é um hook personalizado que fornece informações sobre a autenticação do usuário
  // isAuthenticated indica se o usuário está autenticado
  // isLoading indica se a verificação de autenticação ainda está em andamento
  // user contém os dados do usuário autenticado
  
  const { isAuthenticated, isLoading, user, hasRole } = useAuth(); // Obtém dados de autenticação do contexto

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) { 
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          {/* Spinner animado para indicar carregamento */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p> {/* Mensagem enquanto carrega */}
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) { 
    navigate('/login'); // Redireciona para a página de login
    return null; // Retorna null para não renderizar nada enquanto o redirecionamento acontece
  }

  // Se não tiver permissão para acessar a rota (role inadequada)
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) { 
    navigate('/login'); // Redireciona para a página de login se não tiver a role permitida
    return null; // Retorna null para não renderizar nada enquanto o redirecionamento acontece
  }

  // Se tudo estiver ok (autenticado e com role adequado), renderiza o componente filho
  return children; // Renderiza o conteúdo protegido se a autenticação e roles estiverem corretas
};

// Exporta o componente como padrão
export default ProtectedRoute; // Exporta o componente para ser usado em outras partes da aplicação
