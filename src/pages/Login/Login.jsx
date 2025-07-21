import { useState } from 'react'
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu'

/**
 * Página de Login - Mobile First
 * Interface de autenticação com design moderno seguindo o mockup
 * Integração com API: https://localhost:{value}/api/v1/auth/login
 */
const Login = () => {
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
      const response = await fetch('https://localhost:7283/api/v1/auth/login', {
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
          throw new Error('Email ou senha incorretos. Verifique suas credenciais.')
        } else {
          throw new Error('Erro no servidor. Tente novamente mais tarde.')
        }
      }

      const data = await response.json()
      console.log('Login realizado com sucesso:', data)
      
      // Armazenar token se necessário (localStorage, sessionStorage, etc.)
      if (data.token) {
        localStorage.setItem('authToken', data.token)
      }
      
      // Redirecionamento para a página inicial após login bem-sucedido
      window.location.href = '/'
      
    } catch (err) {
      // Exibir mensagem de erro vermelha
      setError(err.message || 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, var(--primary-color) 0%, var(--secund-color) 100%)`
    }}>
      
      {/* Header com logo e menu hambúrguer responsivo */}
      <div className="flex justify-between items-center p-4 relative z-50">
        {/* Logo da empresa centralizada em mobile, esquerda em desktop */}
        <div className="flex items-center mx-auto md:mx-0">
          <h1 className="text-white text-2xl font-bold tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>New Horizon</h1>
        </div>

        {/* Menu Hambúrguer (apenas mobile/tablet) - ajustado posicionamento */}
        <div className="absolute top-4 right-4 md:hidden">
          <HamburgerMenu />
        </div>
      </div>

      {/* Container principal do formulário */}
      <div className="flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          
          {/* Título do formulário */}
          <div className="text-center mb-8">
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
                placeholder=""
              />
            </fieldset>

            {/* Campo de Senha - usando fieldset e legend */}
            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                SENHA
              </legend>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder=""
              />
            </fieldset>

            {/* Link "Esqueci minha senha" - posicionado conforme imagem */}
            <div className="text-right pt-2">
              <a 
                href="/forgot-password" 
                className="text-white text-sm hover:underline transition duration-200 opacity-90 hover:opacity-100"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
    </div>
  )
}

export default Login
