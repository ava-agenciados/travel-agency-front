import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'
import PasswordRecovery from '../pages/PasswordRecovery/PasswordRecovery.jsx'
import Register from '../pages/Register/register.jsx'
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx'
import AdminDashboard from '../pages/Admin/AdminDashboard.jsx'
import AttendantDashboard from '../pages/Attendant/AttendantDashboard.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'

const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route path='/' element={<LandingPage/>} />
                    <Route path='/login' element={<Login/>} />
                    <Route path='/register' element={<Register/>} />
                    <Route path='/password-recovery' element={<PasswordRecovery/>} />
                    <Route path='/reset-password' element={<ResetPassword/>} />
                    
                    {/* Rotas Protegidas */}
                    <Route 
                        path='/admin' 
                        element={
                            <ProtectedRoute allowedRoles={['Admin']}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path='/attendant' 
                        element={
                            <ProtectedRoute allowedRoles={['Atendente']}>
                                <AttendantDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route path='*' element={<NotFound/>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router