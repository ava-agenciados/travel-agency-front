import { createContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'

// Estados iniciais
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
}

// Actions
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  RESTORE_SESSION: 'RESTORE_SESSION'
}

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    
    case AUTH_ACTIONS.RESTORE_SESSION:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isLoading: false
      }
    
    default:
      return state
  }
}

// Context
export const AuthContext = createContext()

// Provider = significa que : fornece o estado de autenticação e as funções relacionadas para os componentes filhos
export const AuthProvider = ({ children }) => {
  
  // essa const significa que : usa o useReducer para gerenciar o estado de autenticação
  // useReducer é usado para gerenciar o estado de autenticação
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Restaurar sessão ao inicializar
  // o useEffect é usado para restaurar a sessão do usuário ao carregar o componente
  useEffect(() => {

    // Função para restaurar a sessão do usuário
    const restoreSession = () => {
      // Tenta obter o token e verificar sua validade
      try {
        // Obtém o token do serviço de autenticação
        const token = authService.getToken()
        // Se o token existir e for válido, obtém as informações do usuário
        if (token && authService.isTokenValid()) {
          // Define o token no serviço de autenticação
          const user = authService.getUserInfo()
          // Dispara a ação de restauração da sessão com as informações do usuário e token
          dispatch({
            // significa que : ação de restauração da sessão com as informações do usuário e token
            type: AUTH_ACTIONS.RESTORE_SESSION,
            // significa que : payload contém o usuário, token e estado de autenticação
            payload: {
              user, // significa que : usuário autenticado
              token, // significa que : token de autenticação
              isAuthenticated: true // significa que : usuário autenticado
            }
          })
        } else {
          // Token inválido ou expirado - apenas limpa o token sem redirecionar
          authService.clearToken() // significa que : limpa o token do serviço de autenticação
          dispatch({ // significa que : ação de restauração da sessão com usuário e token nulos
            type: AUTH_ACTIONS.RESTORE_SESSION, // significa que : ação de restauração da sessão
            payload: { 
              user: null, // significa que : usuário nulo
              token: null, // significa que : token nulo
              isAuthenticated: false // significa que : usuário não autenticado
            }
          })
        }
        // Define o estado de carregamento como falso após a restauração da sessão
      } catch (error) {
        // Se ocorrer um erro ao restaurar a sessão, limpa o token e define o estado de autenticação como falso
        console.error('Erro ao restaurar sessão:', error)
        // Limpa o token e define o estado de autenticação como falso
        dispatch({
          // significa que : ação de restauração da sessão com usuário e token nulos
          type: AUTH_ACTIONS.RESTORE_SESSION,
          // significa que : payload contém usuário nulo, token nulo e estado de autenticação falso
          payload: {
            user: null, // significa que : usuário nulo
            token: null, // significa que : token nulo
            isAuthenticated: false // significa que : usuário não autenticado
          }
        })
      }
    }

    restoreSession()
  }, [])

  // Função para login
  const login = (token) => {
    try {
      // Define o token no serviço de autenticação
      authService.setToken(token) // significa que : define o token no serviço de autenticação
      const user = authService.getUserInfo() // significa que : obtém as informações do usuário autenticado
      // Dispara a ação de login com as informações do usuário e token
      dispatch({ 
        // significa que : ação de login com as informações do usuário e token
        type: AUTH_ACTIONS.LOGIN_SUCCESS, // significa que : ação de login com sucesso
        payload: { user, token } // significa que : payload contém o usuário autenticado e o token
      })
      
      return { success: true, user } // significa que : retorna sucesso e informações do usuário autenticado
    } catch (error) { // significa que : captura erros durante o login
      console.error('Erro no login:', error) //   significa que : registra o erro no console
      return { success: false, error: error.message } // significa que : retorna falha e mensagem de erro
    }
  }

  // Função para logout
  const logout = () => { // significa que : função para logout do usuário
    authService.clearToken() // significa que : limpa o token do serviço de autenticação
    dispatch({ type: AUTH_ACTIONS.LOGOUT }) // significa que : ação de logout
  }

  // Verificar se o usuário tem permissão para acessar uma rota
  const hasRole = (allowedRoles) => { // significa que : função para verificar se o usuário tem permissão para acessar uma rota
    if (!state.isAuthenticated || !state.user) { // significa que : se o usuário não estiver autenticado ou não tiver informações de usuário
      //   significa que : retorna falso se o usuário não estiver autenticado ou não tiver informações de usuário
      return false
    }
    // Verifica se o usuário tem uma das roles permitidas
    return allowedRoles.includes(state.user.role) // significa que : verifica se o usuário tem uma das roles permitidas
  }

  // Verificar se o usuário é admin
  const isAdmin = () => { 
    return state.user?.role === 'Admin'
  }

  // Verificar se o usuário é atendente
  const isAttendant = () => {
    return state.user?.role === 'Atendente'
  }

  // Cria o valor do contexto com o estado e as funções de autenticação
  const value = {
    ...state,
    login, // significa que : função de login
    logout, // significa que : função de logout
    hasRole, // significa que : função para verificar se o usuário tem permissão para acessar uma rota
    isAdmin, // significa que : função para verificar se o usuário é admin
    isAttendant // significa que : função para verificar se o usuário é atendente
  }

  return (
    // Fornece o contexto de autenticação para os componentes filhos
    <AuthContext.Provider value={value}> 
      {children} {/* Renderiza os componentes filhos dentro do contexto de autenticação */}
    </AuthContext.Provider>
  )
}
