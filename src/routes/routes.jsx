import { Route, Routes, BrowserRouter } from 'react-router-dom'
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
import Layout from '../components/UserProfile/Layout.jsx'
import MyBookings from '../pages/UserProfile/MyBookings.jsx'
import PackageReview from '../pages/PackageReview/PackageReview.jsx'
import PackageDetails from '../pages/PackageDetails/PackageDetails.jsx'
import ResearchResults from '../pages/ResearchResults/ResearchResults.jsx'

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
                    <Route path='/package-details/:id' element={<PackageDetails/>} />
                    <Route path='/payment' element={<Payment/>} />
                    <Route path='/package-review' element={<PackageReview/>} />
                    <Route path='/research-results' element={<ResearchResults/>} />

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