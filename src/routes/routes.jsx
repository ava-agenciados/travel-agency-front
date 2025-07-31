import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'
import PasswordRecovery from '../pages/PasswordRecovery/PasswordRecovery.jsx'
import Register from '../pages/Register/register.jsx'
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx'
import AdminDashboard from '../pages/Admin/AdminDashboard.jsx'
import AttendantDashboard from '../pages/Attendant/AttendantDashboard.jsx'
import Payment from '../pages/Payment/Payment.jsx'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx'
import UserProfile from '../pages/UserProfile/UserProfile.jsx'
import Layout from '../components/UserProfile/Layout.jsx'
import MyBookings from '../pages/UserProfile/MyBookings.jsx'

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
                    <Route path='/payment' element={<Payment/>} />

                    {/*rota pai*/}
                     <Route 
                        path="/" 
                        element={
                            <ProtectedRoute allowedRoles={['Cliente']}>
                                <Layout/>
                            </ProtectedRoute>
                        }
                    >
                        <Route path="userdata" element={<UserProfile/>} />
                        <Route path="mybookings" element={<MyBookings/>} />
                    </Route>
                    
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