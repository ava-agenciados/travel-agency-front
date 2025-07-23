import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'
import Register from '../pages/Register/register.jsx'


const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route path='/' element={<LandingPage/>} />

                    <Route path='/login' element={<Login/>} />

                    <Route path='*' element={<NotFound/>} />
                    <Route path='/register' element={<Register/>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router