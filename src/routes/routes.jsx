// Importa componentes de roteamento do React Router DOM
import { Route, Routes, BrowserRouter } from 'react-router-dom'
// Importa páginas da aplicação
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'
import PasswordRecovery from '../pages/PasswordRecovery/PasswordRecovery.jsx'
import Register from '../pages/Register/Register.jsx'
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx'
import AdminDashboard from '../pages/Admin/AdminDashboard.jsx'
import AttendantDashboard from '../pages/Attendant/AttendantDashboard.jsx'
import Payment from '../pages/Payment/Payment.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'
import UserProfile from '../pages/UserProfile/UserProfile.jsx'


// Componente que define todas as rotas da aplicação
const Router = () => {

    return (
        <>
            {/* BrowserRouter fornece contexto de roteamento para toda a aplicação */}
            <BrowserRouter>
                <Routes>
                    
                    {/* Rotas públicas - acessíveis sem autenticação */}
                    <Route path='/' element={<LandingPage/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/password-recovery' element={<PasswordRecovery/>} />
                    <Route path='/reset-password' element={<ResetPassword/>} />
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/user-profile' element={<UserProfile/>} />

                    
                    {/* Rotas Protegidas - requerem autenticação e role específico */}
                    {/* Rota para administradores - apenas usuários com role 'Admin' podem acessar */}
                    <Route 
                        path='/admin' 
                        element={
                            <ProtectedRoute allowedRoles={['Admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    {/* Rota para atendentes - apenas usuários com role 'Atendente' podem acessar */}
                    <Route 
                        path='/attendant' 
                        element={
                            <ProtectedRoute allowedRoles={['Atendente']}>
                                <AttendantDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    {/* Rota catch-all - qualquer URL não definida mostra página 404 */}
                    <Route path='*' element={<NotFound/>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

// Exporta o componente Router como padrão
export default Router