import { useState } from 'react'
import Images from '../../assets/image.jsx'

/**
 * Página de Recuperação de Senha - Mobile First
 * Integração com API: https://localhost:7283/api/v1/auth/forgot-password
 */
const PasswordRecovery = () => {
  // Estados para controlar o formulário
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Configuração da posição do botão (ajustável)
  const buttonVerticalOffset = 0 // em pixels - ajuste este valor para alinhar perfeitamente

  // Função para validar formato do email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para tratar mudanças no input de email
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    // Limpar mensagens quando o usuário digitar
    if (error) setError('')
    if (successMessage) setSuccessMessage('')
  }

  // Função para enviar email de recuperação
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      // Validações do email
      if (!email.trim()) {
        throw new Error('Por favor, insira seu email.')
      }

      if (!validateEmail(email.trim())) {
        throw new Error('Por favor, insira um email válido.')
      }

      // Chamada para API de recuperação de senha
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email.trim()
        })
      })

      if (!response.ok) {
        // Tratamento de erros específicos
        if (response.status === 400) {
          throw new Error('Email não cadastrado.')
        } else if (response.status === 429) {
          throw new Error('Muitas tentativas. Tente novamente em alguns minutos.')
        } else {
          throw new Error('Erro no servidor. Tente novamente mais tarde.')
        }
      }

      const data = await response.json()
      console.log('Email de recuperação enviado:', data)
      
      // Mensagem de sucesso
      setSuccessMessage(`Email de recuperação enviado para ${email.trim()}! Verifique sua caixa de entrada e spam.`)
      setEmail('') // Limpar campo após sucesso
      
    } catch (err) {
      // Exibir mensagem de erro
      setError(err.message || 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden" style={{
      background: `#122137`
    }}>      

      {/* Logo da Agência */}
      <div className="absolute top-4 z-30 w-full lg:w-auto lg:left-6">
        <div className="text-center lg:text-left px-4 lg:px-0">
          <h1 className="text-white text-3xl font-bold tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
            New Horizons
          </h1>
        </div>
      </div> 

      {/* Layout principal - responsivo */}
      <div className="flex h-screen pt-20 lg:pt-0">
        
        {/* Container do formulário - esquerda no desktop, centro no mobile */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-sm">
          
            {/* Título do formulário */}
            <div className="text-center mb-4">
              <h2 className="text-white font-semibold italic text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                RECUPERAR SENHA
              </h2>
              <p className="text-white text-sm mt-2 opacity-80" style={{ fontFamily: 'Inter, sans-serif' }}>
                Digite seu email para receber instruções.
              </p>
            </div>
            
            {/* Exibição de mensagens de erro */}
            {error && (
              <div className="mb-6 p-4 bg-red-500 bg-opacity-90 border-2 border-red-600 text-white rounded-lg text-sm shadow-lg">
                <div className="flex items-center">
                  <span className="mr-3 text-lg">❌</span>
                  <div>
                    <p className="font-semibold">Erro</p>
                    <p className="text-red-100">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Exibição de mensagens de sucesso */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-500 bg-opacity-90 border-2 border-green-600 text-white rounded-lg text-sm shadow-lg">
                <div className="flex items-center">
                  <span className="mr-3 text-lg">✅</span>
                  <div>
                    <p className="font-semibold">Sucesso!</p>
                    <p className="text-green-100">{successMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Formulário de recuperação */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex items-baseline relative">
                {/* Campo de Email */}
                <fieldset className="border border-white border-opacity-40 rounded-l-md px-3 py-1.5 flex-1 flex items-center" style={{
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
                    value={email}
                    onChange={handleEmailChange}
                    required
                    className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    placeholder="user@example.com"
                  />
                </fieldset>

                {/* Botão ENVIAR */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-r-md transition duration-200 disabled:cursor-not-allowed flex items-center justify-center border-l-0"
                  style={{
                    backgroundColor: isLoading ? '#93c5fd' : '#2563eb',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading) {
                      e.target.style.backgroundColor = '#1d4ed8'
                      e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading) {
                      e.target.style.backgroundColor = '#2563eb'
                      e.target.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)'
                    }
                  }}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-15 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>

            {/* Link para voltar ao login e cadastrar-se */}
            <div className="mt-8 text-center pb-8">
              <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
                Lembrou da senha?{' '}
                <a 
                  href="/login" 
                  className="font-medium hover:underline transition duration-200"
                  style={{ color: '#FFD700', fontFamily: 'Inter, sans-serif' }}
                >
                  Voltar ao Login
                </a>
              </p>
              
              <p className="text-white p-3 text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
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

export default PasswordRecovery
