// Importa useState para gerenciamento de estado local
import { useState } from 'react'
// Importa componente de menu hambúrguer (não utilizado neste componente)
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu'
// Importa componente reutilizável de campo de senha
import PasswordField from '../../components/PasswordField/PasswordField'
// Importa imagens utilizadas na página
import Images from '../../assets/image.jsx'
import api from '../../services/api'

/**
 * Página de Cadastro - Mobile First
 * Interface de registro com design moderno seguindo o mockup
 * Integração com API: https://localhost:{value}/api/v1/auth/register
 */
const Register = () => {
  // Estados para controlar o formulário de cadastro
  const [formData, setFormData] = useState({
    firstName: '',    // Nome do usuário
    lastName: '',     // Sobrenome do usuário
    cpfPassport: '',  // CPF ou Passaporte
    phoneNumber: '',  // Número de telefone
    email: '',        // Email do usuário
    password: ''      // Senha do usuário
  })
  const [isLoading, setIsLoading] = useState(false)  // Controla estado de carregamento
  const [error, setError] = useState('')             // Armazena mensagens de erro
  const [success, setSuccess] = useState('')         // Armazena mensagens de sucesso

  // Função para lidar com mudanças nos inputs do formulário
  const handleChange = (e) => {
    const { name, value } = e.target
    // Atualiza o estado preservando os outros campos
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função para enviar o formulário de cadastro
  // Função para validar senha forte
  const isStrongPassword = (password) => {
    // Mínimo 9 caracteres, pelo menos 1 número, 1 especial e 1 letra
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{9,}$/.test(password);
  };

  // Função para validar CPF simples (formato)
  const isValidCPF = (cpf) => {
    // Aceita apenas números e 11 dígitos
    return /^\d{11}$/.test(cpf);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validação front-end
    if (!isStrongPassword(formData.password)) {
      setIsLoading(false);
      setError("A senha deve ter no mínimo 8 caracteres, incluindo número e caractere especial.");
      return;
    }
    if (!isValidCPF(formData.cpfPassport)) {
      setIsLoading(false);
      setError("CPF deve conter 11 dígitos numéricos.");
      return;
    }
    // Telefone simples: mínimo 8 dígitos
    if (!/^\d{8,}$/.test(formData.phoneNumber)) {
      setIsLoading(false);
      setError("Telefone deve conter ao menos 8 dígitos numéricos.");
      return;
    }

    try {
      const response = await api.post('/api/v1/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        cpfPassport: formData.cpfPassport,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      })

      const data = response.data
      console.log('Cadastro realizado com sucesso:', data)
      
      setSuccess('Cadastro realizado com sucesso! Redirecionando para login...')
      
      // Redirecionamento para a página de login após cadastro bem-sucedido
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      // Tratamento de erro específico do Axios
      if (err.response) {
        if (err.response.status === 400) {
          setError('Dados inválidos. Verifique as informações.')
        } else if (err.response.status === 409) {
          setError('Email já cadastrado.')
        } else {
          setError('Erro no servidor. Tente novamente mais tarde.')
        }
      } else if (err.request) {
        setError('Erro de conexão. Verifique sua internet.')
      } else {
        setError(err.message || 'Erro interno do servidor')
      }
    } finally {
      setIsLoading(false);
    }
  };

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