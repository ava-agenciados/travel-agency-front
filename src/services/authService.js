import { jwtDecode } from 'jwt-decode'

/**
 * Serviço de Autenticação
 * Gerencia armazenamento, decodificação e validação de tokens JWT
 */
class AuthService {
  constructor() {
    this.TOKEN_KEY = 'authToken'
  }

  /**
   * Armazena o token no localStorage
   * @param {string} token - Token JWT recebido da API
   */
  setToken(token) {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }



  /**
   * Recupera o token do localStorage
   * 
   * @returns {string|null} Token armazenado ou null se não existir
   */
  getToken() {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  /**
   * Remove o token do localStorage (logout)
   */
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY)
  }

  /**
   * Limpa o token sem redirecionar (para uso interno)
   */
  clearToken() {
    this.removeToken()
  }

  /**
   * Decodifica o token JWT e retorna o payload
   * @returns {object|null} Payload do token ou null se inválido
   */
  getDecodedToken() {
    const token = this.getToken()
    if (!token) return null

    try {
      const decoded = jwtDecode(token)
      return decoded
    } catch (error) {
      console.error('Erro ao decodificar token:', error)
      this.removeToken() // Remove token inválido
      return null
    }
  }

  /**
   * Verifica se o token ainda é válido (não expirou)
   * @returns {boolean} True se válido, false se expirado ou inexistente
   */
  isTokenValid() {
    const decoded = this.getDecodedToken()
    if (!decoded) return false

    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} True se autenticado com token válido
   */
  isAuthenticated() {
    return this.isTokenValid()
  }

  /**
   * Obtém o papel/role do usuário logado
   * @returns {string|null} Role do usuário ou null se não autenticado
   */
  getUserRole() {
    const decoded = this.getDecodedToken()
    if (!decoded) return null

    // O role pode estar em diferentes claims dependendo da configuração do servidor
    return decoded.role || 
           decoded.roles || 
           null
  }

  /**
   * Obtém informações do usuário logado
   * @returns {object|null} Dados do usuário ou null se não autenticado
   */
  getUserInfo() {
    const decoded = this.getDecodedToken()
    if (!decoded) return null

    return {
      id: decoded.sub,
      email: decoded.email,
      role: this.getUserRole(),
      exp: decoded.exp,
      iat: decoded.iat 
    }
  }

  /**
   * Verifica se o usuário é administrador
   * @returns {boolean} True se é admin
   */
  isAdmin() {
    const role = this.getUserRole()
    return role === 'Admin'
  }

  /**
   * Verifica se o usuário é atendente
   * @returns {boolean} True se é atendente
   */
  isAtendente() {
    const role = this.getUserRole()
    return role === 'Atendente'
  }

  /**
   * Realiza logout completo
   */
  logout() {
    this.removeToken()
    // Redireciona para login
    window.location.href = '/login'
  }

  /**
   * Redireciona o usuário baseado no seu papel
   */
  redirectBasedOnRole() {
    if (!this.isAuthenticated()) {
      window.location.href = '/login'
      return
    }

    const role = this.getUserRole()
    
    if (role === 'Admin') {
      // Redireciona para dashboard admin
      window.location.href = '/admin'
    } else if (role === 'Atendente') {
      // Redireciona para área de atendimento
      window.location.href = '/attendant'
    } else {
      // Usuários sem role específico (clientes) vão para a landing page
      window.location.href = '/'
    }
  }

  /**
   * Obtém a URL de redirecionamento baseada no papel do usuário
   * @returns {string} URL de redirecionamento
   */
  getRedirectUrl() {
    if (!this.isAuthenticated()) {
      return '/login'
    }

    const role = this.getUserRole()
    
    if (role === 'Admin' || role === 'Administrador') {
      return '/admin'
    } else if (role === 'Atendente') {
      return '/attendant'
    } else {
      // Usuários sem role específico (clientes) vão para a landing page
      return '/'
    }
  }
}

// Exporta uma instância única (singleton)
export const authService = new AuthService()
export default authService
