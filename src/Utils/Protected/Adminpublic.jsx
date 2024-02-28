import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminpublic(props) {
    if (localStorage.getItem('accesToken')) {
        return <Navigate to='/admin/' />

    } else {
        <Navigate to='/admin/login' />
        return props.children
    }
}

export default Adminpublic
