
import { useAppSelector } from '../store/hooks';
import authService from '../services/authService';


export const useAuth = () => { // Hook personalizado para acessar o contexto de autenticação
  const { user, isAuthenticated, loading: isLoading } = useAppSelector(state => state.auth);
  // const = constante que extrai os dados de autenticação do estado global da aplicação
  // user contém os dados do usuário autenticado
  // isAuthenticated indica se o usuário está autenticado
  // isLoading indica se a verificação de autenticação ainda está em andamento
  
  // useAppSelector é um hook do Redux Toolkit para acessar o estado global da aplicação
  // authService é um serviço que gerencia a autenticação do usuário, como login e logout
  // state = estado global da aplicação 
  // state.auth = parte do estado que contém informações de autenticação

  // Verifica se o usuário possui uma das roles permitidas
  const hasRole = (roles = []) => { // Função para verificar se o usuário tem uma das roles permitidas
    if (!user || !user.role) return false; // Se não houver usuário ou role, retorna false
    return roles.includes(user.role); // Verifica se a role do usuário está entre as roles permitidas
    // roles = array de roles permitidas para acessar a rota
    // includes = método que verifica se um elemento está presente em um array
    // user.role = role do usuário autenticado
  };

  /*
  retornando 
  O usuario,
  IsAuthenticated = se o usuário está autenticado ou não
  IsLoading = Indica se o sitema esta carregando informações ainda ou não (API)
  hasRole = A role do usuário (admin,cliente,atendente)
  Logout : chama o método de autenticação do authService (uso do logout)
  .bind(authService) é para chamar a função logout.
  */
  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole,
    logout: authService.logout.bind(authService),
  };
};
