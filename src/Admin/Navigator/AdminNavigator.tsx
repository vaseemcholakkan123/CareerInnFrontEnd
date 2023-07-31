import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHomePage from '../Pages/HomePage/AdminHomePage'
import Login from '../Auth/Login'

function AdminNavigator() {
    return (
        <>
            <Routes>
                <Route path='/' element={< AdminHomePage />} />
                <Route path='/login' element={< Login />} />
            </Routes>

        </>
    )
}

export default AdminNavigator