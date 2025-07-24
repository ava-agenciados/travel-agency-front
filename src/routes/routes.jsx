import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'
import PasswordRecovery from '../pages/PasswordRecovery/PasswordRecovery.jsx'
import Register from '../pages/Register/register.jsx'
import ResetPassword from '../pages/ResetPassword/ResetPassword.jsx'

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
                    <Route path='*' element={<NotFound/>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router