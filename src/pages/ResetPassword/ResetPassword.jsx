
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PasswordField from '../../components/PasswordField/PasswordField'
import Images from '../../assets/image.jsx'
import api from '../../services/api'



/**

 * Página de Redefinição de Senha - Mobile First

 * Interface para redefinir senha com design moderno

 * Integração com API: PATCH /api/v1/auth/reset-password

 */



function useQuery() {

    return new URLSearchParams(useLocation().search);

}



const ResetPassword = () => {

    const [formData, setFormData] = useState({
        password: '',
        token: '',
        email: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const query = useQuery()

    const navigate = useNavigate()



    const token = query.get("token")

    const email = query.get("email")



    // Verifica se token e email estão presentes na URL e preenche os campos

    useEffect(() => {

        if (token) {

            setFormData(prev => ({

                ...prev,

                token: decodeURIComponent(token)

            }))

        }

        if (email) {

            setFormData(prev => ({

                ...prev,

                email: decodeURIComponent(email)

            }))

        }

    }, [token, email])



    // Função para lidar com mudanças nos inputs

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData(prev => ({

            ...prev,

            [name]: value

        }))

    }



    // Função para enviar o formulário de redefinição de senha

    const handleSubmit = async (e) => {

        e.preventDefault()

        setIsLoading(true)

        setError('')

        setSuccess('')



        // Validação local

        if (formData.password.length < 6) {

            setError('A senha deve ter pelo menos 6 caracteres.')

            setIsLoading(false)

            return

        }



        try {

            const response = await api.patch('/api/v1/auth/reset-password', {
                password: formData.password,
                token: formData.token,
                email: formData.email
            })

            const data = response.data
            console.log('Senha redefinida com sucesso:', data)
            setSuccess('Senha redefinida com sucesso! Redirecionando para login...')
            // Redirecionamento para a página de login após redefinição bem-sucedida
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (err) {
            // Tratamento de erro específico do Axios
            if (err.response) {
                if (err.response.status === 400) {
                    // Tenta extrair os erros de validação do corpo da resposta
                    const errorData = err.response.data
                    if (errorData.errors) {
                        // Junta todas as mensagens de erro em uma string
                        const messages = Object.entries(errorData.errors)
                            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
                            .join(' | ')
                        setError(messages)
                    } else if (errorData.title) {
                        setError(errorData.title)
                    } else {
                        setError('Token inválido ou expirado.')
                    }
                } else if (err.response.status === 404) {
                    setError('Usuário não encontrado.')
                } else {
                    setError('Erro no servidor. Tente novamente mais tarde.')
                }
            } else if (err.request) {
                setError('Erro de conexão. Verifique sua internet.')
            } else {
                setError(err.message || 'Erro interno do servidor')
            }

        } finally {

            setIsLoading(false)

        }

    }



    return (

        <div className="min-h-screen" style={{

            background: `#122137`

        }}>

            {/* Header com logo centralizada - apenas mobile */}

            <div className="p-4 relative z-50 lg:hidden">

                {/* Logo da empresa centralizada em mobile */}

                <div className="text-center">

                    <h1 className="text-white text-3xl font-bold tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>New Horizons</h1>

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

                                REDEFINIR SENHA

                            </h2>

                        </div>

                        {/* Exibição de mensagens de erro */}

                        {error && (

                            <div className="mb-6 p-4 bg-red-500 bg-opacity-90 border-2 border-red-600 text-white rounded-lg text-sm shadow-lg">

                                <div className="flex items-center">

                                    <span className="mr-3 text-lg">❌</span>

                                    <div>

                                        <p className="font-semibold">Erro na Redefinição</p>

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



                        {/* Campos ocultos para token e email */}

                        <input type="hidden" name="token" value={formData.token} />

                        <input type="hidden" name="email" value={formData.email} />



                        {/* Formulário de redefinição de senha */}

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Campo Nova Senha com ícone de olhinho */}

                            {/* Campo de Nova Senha - usando o componente PasswordField */}
                            <PasswordField
                                label="NOVA SENHA"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder=""
                                required={true}
                            />



                            {/* Botão principal de redefinição */}

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

                                        Redefinindo...

                                    </div>

                                ) : (

                                    'REDEFINIR SENHA'

                                )}

                            </button>

                        </form>



                        {/* Link para página de login - cor amarela conforme padrão */}

                        <div className="mt-8 text-center pb-8">

                            <p className="text-white text-sm opacity-90" style={{ fontFamily: 'Inter, sans-serif' }}>

                                Lembrou da senha?{' '}

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

                <div className="hidden lg:flex lg:w-2/4 fixed right-0 top-0 h-screen overflow-hidden relative z-0">

                    <img

                        src={Images.LoginPageImage}

                        alt="ResetPasswordPageImage"

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



export default ResetPassword;