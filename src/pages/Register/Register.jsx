import { useState } from 'react'
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu'
import PasswordField from '../../components/PasswordField/PasswordField'
import Images from '../../assets/image.jsx'

/**
 * Página de Cadastro - Mobile First
 * Interface de registro com design moderno seguindo o mockup
 * Integração com API: https://localhost:{value}/api/v1/auth/register
 */
const Register = () => {
  // Estados para controlar o formulário de cadastro
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cpfPassport: '',
    phoneNumber: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Função para lidar com mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função para enviar o formulário de cadastro
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          cpfPassport: formData.cpfPassport,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          password: formData.password
        })
      })

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Dados inválidos. Verifique as informações.')
        } else if (response.status === 409) {
          throw new Error('Email já cadastrado.')
        } else {
          throw new Error('Erro no servidor. Tente novamente mais tarde.')
        }
      }

      const data = await response.json()
      console.log('Cadastro realizado com sucesso:', data)
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando para login...')
      
      // Redirecionamento para a página de login após cadastro bem-sucedido
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
      
    } catch (err) {
      setError(err.message || 'Erro interno do servidor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{
      background: `#122137`
    }}>
      
      {/* Header com logo */}
      <div className="relative top-0 left-0 w-full p-4 z-50">
        {/* Logo da empresa centralizada em mobile, esquerda no desktop */}
        <div className="text-center lg:text-left">
          <h1 className="text-white text-3xl font-bold tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}
          >New Horizons</h1>
        </div>
      </div>  

      {/* Layout principal - responsivo */}
      <div className="flex min-h-[calc(100vh-80px)]">
        
        {/* Container do formulário - esquerda no desktop, centro no mobile */}
        <div className="w-full lg:w-3/5 flex items-center justify-center px-6 py-8">
          <div className="w-full max-w-sm">
          
          {/* Título do formulário */}
          <div className="text-center mb-8">
            <h2 className="text-white font-semibold italic" style={{ fontFamily: 'Inter, sans-serif' }}>
              FAÇA SEU CADASTRO
            </h2>
          </div>
          
          {/* Exibição de mensagens de erro */}
          {error && (
            <div className="mb-6 p-4 bg-red-500 bg-opacity-90 border-2 border-red-600 text-white rounded-lg text-sm shadow-lg">
              <div className="flex items-center">
                <span className="mr-3 text-lg">❌</span>
                <div>
                  <p className="font-semibold">Erro no Cadastro</p>
                  <p className="text-red-100">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Exibição de mensagens de sucesso */}
          {success && (
            <div className="mb-6 p-4 bg-green-500 bg-opacity-90 border-2 border-green-600 text-white rounded-lg text-sm shadow-lg">
              <div className="flex items-center">
                <span className="mr-3 text-lg">✅</span>
                <div>
                  <p className="font-semibold">Sucesso!</p>
                  <p className="text-green-100">{success}</p>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo Primeiro Nome */}
            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                PRIMEIRO NOME
              </legend>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder=""
              />
            </fieldset>

            {/* Campo Sobrenome */}
            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                SOBRENOME
              </legend>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder=""
              />
            </fieldset>

            {/* Campo CPF ou Passaporte */}
            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                N° CPF ou PASSAPORTE
              </legend>
              <input
                type="text"
                id="cpfPassport"
                name="cpfPassport"
                value={formData.cpfPassport}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder=""
              />
            </fieldset>

            {/* Campo Telefone */}
            <fieldset className="border border-white border-opacity-40 rounded-md p-2 relative" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <legend className="text-white text-sm font-medium px-2 uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                TELEFONE
              </legend>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white placeholder-white placeholder-opacity-60 focus:outline-none text-base border-none p-0"
                style={{ fontFamily: 'Inter, sans-serif' }}
                placeholder=""
              />
            </fieldset>

            {/* Campo Email */}
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

            {/* Campo Senha - usando o componente PasswordField */}
            <PasswordField
              label="SENHA"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              required={true}
            />

            {/* Botão principal de cadastro */}
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
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Cadastrando...
                </div>
              ) : (
                'CADASTRAR'
              )}
            </button>
          </form>

          {/* Link para página de login - cor amarela conforme padrão */}
          <div className="mt-8 text-center pb-8">
            <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>
              Já tem uma conta?{' '}
              <a 
                href="/login" 
                className="font-medium hover:underline transition duration-200"
                style={{ color: '#FFD700', fontFamily: 'Inter, sans-serif' }}
              >
                Faça login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Seção da imagem - apenas desktop, lado direito */}
      <div className="hidden lg:flex lg:w-2/4 fixed right-0 top-0 h-screen overflow-hidden z-0">
        <img 
          src={Images.LoginPageImage} 
          alt="RegisterPageImage" 
          className="w-full h-full object-cover"
          style={{ 
            filter: 'brightness(0.8) contrast(1.1)',
          }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600/4A90E2/ffffff?text=New+Horizons';
          }}
        />
        {/* Inner Shadow com configurações específicas */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 75px 60px 30px 5px #122137'
          }}
        />
      </div>

    </div>
    </div>
  )
}

export default Register