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

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Restaurar sessão ao inicializar
  useEffect(() => {
    const restoreSession = () => {
      try {
        const token = authService.getToken()
        if (token && authService.isTokenValid()) {
          const user = authService.getUserInfo()
          dispatch({
            type: AUTH_ACTIONS.RESTORE_SESSION,
            payload: {
              user,
              token,
              isAuthenticated: true
            }
          })
        } else {
          // Token inválido ou expirado - apenas limpa o token sem redirecionar
          authService.clearToken()
          dispatch({
            type: AUTH_ACTIONS.RESTORE_SESSION,
            payload: {
              user: null,
              token: null,
              isAuthenticated: false
            }
          })
        }
      } catch (error) {
        console.error('Erro ao restaurar sessão:', error)
        dispatch({
          type: AUTH_ACTIONS.RESTORE_SESSION,
          payload: {
            user: null,
            token: null,
            isAuthenticated: false
          }
        })
      }
    }

    restoreSession()
  }, [])

  // Função para login
  const login = (token) => {
    try {
      authService.setToken(token)
      const user = authService.getUserInfo()
      
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: { user, token }
      })
      
      return { success: true, user }
    } catch (error) {
      console.error('Erro no login:', error)
      return { success: false, error: error.message }
    }
  }

  // Função para logout
  const logout = () => {
    authService.clearToken()
    dispatch({ type: AUTH_ACTIONS.LOGOUT })
  }

  // Verificar se o usuário tem permissão para acessar uma rota
  const hasRole = (allowedRoles) => {
    if (!state.isAuthenticated || !state.user) {
      return false
    }
    
    return allowedRoles.includes(state.user.role)
  }

  // Verificar se o usuário é admin
  const isAdmin = () => {
    return state.user?.role === 'Admin'
  }

  // Verificar se o usuário é atendente
  const isAttendant = () => {
    return state.user?.role === 'Atendente'
  }

  const value = {
    ...state,
    login,
    logout,
    hasRole,
    isAdmin,
    isAttendant
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
