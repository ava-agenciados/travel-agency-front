import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {object} Contexto de autenticação com métodos e estado
 */
export const useAuth = () => { // significa que : hook para acessar o contexto de autenticação
  
  // Obtém o contexto de autenticação
  const context = useContext(AuthContext) 
  
  if (!context) { // significa que : se o contexto não estiver disponível, lança um erro
    throw new Error('useAuth deve ser usado dentro de um AuthProvider') 
  }
  
  // Retorna o contexto de autenticação
  // significa que : retorna o contexto de autenticação para ser usado nos componentes
  return context
}
