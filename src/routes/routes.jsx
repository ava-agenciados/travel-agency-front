import { Route, Routes, BrowserRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound/NotFound.jsx'
import LandingPage from '../pages/LandingPage/LandingPage.jsx'
import Login from '../pages/Login/Login.jsx'

const Router = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    
                    <Route path='/' element={<LandingPage/>} />

                    <Route path='/landing' element={<LandingPage/>} />

                    <Route path='/login' element={<Login/>} />

                    <Route path='*' element={<NotFound/>} />

                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router