import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu'
import PasswordField from '../../components/PasswordField/PasswordField'
import Images from '../../assets/image.jsx'
import authService from '../../services/authService'

/**
 * Página de Login - Mobile First
 * Interface de autenticação com design moderno seguindo o mockup
 * Integração com API: https://localhost:{value}/api/v1/auth/login
 */
const Login = () => {
  const { login } = useAuth()
  
  // Estados para controlar o formulário de login
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função para enviar o formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para enviar cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      if (!response.ok) {
        // Se a resposta não for ok, trata como credenciais incorretas
        if (response.status === 401 || response.status === 400) {
          throw new Error('Email ou senha incorretos.')
        } else {
          throw new Error('Erro no servidor. Tente novamente mais tarde.')
        }
      }

      const data = await response.json()
      
      // Verificar se o login foi bem-sucedido e há um token
      if (data.success && data.token) {
        // Usar o contexto de autenticação para fazer login
        const loginResult = login(data.token)
        
        if (loginResult.success) {
          
          // Usar o método do authService para redirecionamento
          const redirectUrl = authService.getRedirectUrl()
          window.location.href = redirectUrl
        } else {
          throw new Error(loginResult.error || 'Erro ao processar token')
        }
      } else {
        throw new Error(data.message || 'Erro no login')
      }
      
    } catch (err) {
      // Exibir mensagem de erro vermelha
      setError(err.message || 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{
      background: `#122137`
    }}>

      {/* Logo da Agência */}
      <div className="absolute top-4 z-30 w-full lg:w-auto lg:left-6">
        <div className="text-center lg:text-left px-4 lg:px-0">
          <h1 className="text-white text-3xl font-bold tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
            New Horizon
          </h1>
        </div>
      </div> 

      {/* Layout principal - responsivo */}
      <div className="flex min-h-[calc(100vh-80px)]">
        
        {/* Container do formulário - esquerda no desktop, centro no mobile */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-sm">
          
          {/* Título do formulário */}
          <div className="text-center mb-8 mt-16">
            <h2 className="text-white font-semibold italic" style={{ fontFamily: 'Inter, sans-serif' }}>
              ACESSE SUA CONTA
            </h2>
          </div>        
          
          {/* Exibição de mensagens de erro - destaque vermelho */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-90 border-2 border-red-600 text-white rounded-lg text-sm shadow-lg">
              <div className="flex items-center">
                <span className="mr-3 text-lg">❌</span>
                <div>
                  <p className="font-semibold">Erro de Autenticação</p>
                  <p className="text-red-100">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            

            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                EMAIL
              </legend>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder="EMAIL"
              />
            </fieldset>

            {/* Campo de Senha - usando o componente PasswordField */}
            <PasswordField
              label="SENHA"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="SENHA"
              required={true}
            />

            {/* Link "Esqueci minha senha" - posicionado conforme imagem */}
            <div className="text-right">
              <a 
                href="/password-recovery" 
                className="text-white text-sm hover:underline transition duration-200 opacity-90 hover:opacity-100"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                Esqueci minha senha
              </a>
            </div>

            {/* Botão principal de login - conforme design da imagem */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-4 text-white font-medium rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
              style={{
                backgroundColor: 'var(--third-color)',
                boxShadow: '0 4px 15px rgba(24, 119, 242, 0.3)',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#1565c0'
                  e.target.style.transform = 'translateY(-1px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(24, 119, 242, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = 'var(--third-color)'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(24, 119, 242, 0.3)'
                }
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  {/* Spinner de loading */}
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </div>
              ) : (
                'ENTRAR'
              )}
            </button>
          </form>

          {/* Link para página de cadastro - cor amarela conforme solicitado */}
          <div className="mt-8 text-center pb-8">
            <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
              Não possui conta?{' '}
              <a 
                href="/register" 
                className="font-medium hover:underline transition duration-200"
                style={{ color: '#FFD700', fontFamily: 'Inter, sans-serif' }}
              >
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Seção da imagem - apenas desktop, lado direito */}
      <div className="hidden lg:flex lg:w-2/4 fixed right-0 top-0 h-screen overflow-hidden relative z-20">
        <img 
          src={Images.LoginPageImage} 
          alt="LoginPageImage" 
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.8) contrast(1.1)', // ajusta aparencia da imagem
          }}
          onError={(e) => { // substituir imagem se falhar o carregamento
            e.target.src = 'https://via.placeholder.com/800x600/4A90E2/ffffff?text=New+Horizons';
          }}
        />
        {/* Inner Shadow com configurações específicas do Figma */}
        <div 
          className="absolute inset-0 pointer-events-none" // absolute inset-0 cobre toda a imagem; pointer-events: none garante que o overlay não interfira na interação
          style={{
            boxShadow: 'inset 75px 60px 30px 5px #122137' // box-shadow: replica as configurações do Figma
          }}
        />
      </div>

    </div>
  </div>
  )
}

export default Login