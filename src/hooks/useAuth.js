import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {object} Contexto de autenticação com métodos e estado
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  
  return context
}
