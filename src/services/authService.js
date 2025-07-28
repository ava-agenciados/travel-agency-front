import { jwtDecode } from 'jwt-decode'

/**
 * Serviço de Autenticação
 * Gerencia armazenamento, decodificação e validação de tokens JWT
 */
class AuthService { 
  constructor() {
    this.TOKEN_KEY = 'authToken'
  }
  // Armazena o token no localStorage
  setToken(token) {
    if (token) localStorage.setItem(this.TOKEN_KEY, token)
  }

  // Recupera o token do localStorage
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  // Remove o token do localStorage (logout)
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  // Decodifica o token JWT e retorna o payload
  getDecodedToken() {
    const token = this.getToken()
    if (!token) return null

    try {
      return jwtDecode(token)
    } catch (error) {
      console.error('Erro ao decodificar token:', error)
      this.removeToken() // Remove token inválido
      return null
    }
  }


  // Verifica se o token ainda é válido (não expirou)
  isTokenValid() {
    const { exp } = this.getDecodedToken() || {}
    return exp ? exp > Date.now() / 1000 : false
  }

  // Verifica se o usuário está autenticado
  isAuthenticated() {
    return this.isTokenValid()
  }

  // Obtém o papel/role do usuário logado
  getUserRole() {
    const decoded = this.getDecodedToken()
    if (!decoded) return null

    // Verificação simplificada para determinar o papel do usuário
    const role = decoded.role || decoded.roles?.[0] || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.perfil || decoded.perfis?.[0]
    return role ? String(role) : null
  }

  // Obtém as informações do usuário logado
  getUserInfo() {
    const decoded = this.getDecodedToken()
    if (!decoded) return null

    const { sub, email, exp, iat } = decoded
    return { id: sub, email, role: this.getUserRole(), exp, iat }
  }

  // Verifica se o usuário é administrador
  isAdmin() {
    return this.getUserRole() === 'Admin'
  }

  // Verifica se o usuário é atendente
  isAtendente() {
    return this.getUserRole() === 'Atendente'
  }

  // Realiza logout completo
  logout() {
    this.removeToken()
    window.location.href = '/login'
  }

  // Redireciona o usuário baseado no seu papel
  redirectBasedOnRole() {
    if (!this.isAuthenticated()) {
      window.location.href = '/login'
      return
    }

    const role = this.getUserRole()
    window.location.href = this.getRedirectUrl(role)
  }

  // Obtém a URL de redirecionamento baseada no papel do usuário
  getRedirectUrl(role = this.getUserRole()) {
    if (!this.isAuthenticated()) return '/login'

    const redirectUrls = {
      Admin: '/admin',
      Atendente: '/attendant',
      Cliente: '/',
      default: '/'
    }

    return redirectUrls[role] || redirectUrls.default
  }
}

// Exporta uma instância única (singleton)
export const authService = new AuthService()
export default authService
