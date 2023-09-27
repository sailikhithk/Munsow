import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

import "./App.css"
import Practice from './pages/Practice'
import Welcome from './pages/Welcome'
// @ts-ignore
import Start from './pages/Start'
import PageNotFound from './pages/PageNotFound'

const App = () => {
    return (
        <Routes>
            <Route path='/' exect element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/practice' element={<Practice />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/start' element={<Start />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default App
