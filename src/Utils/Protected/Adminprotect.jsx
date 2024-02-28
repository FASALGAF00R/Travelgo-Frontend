import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminprotect(props) {
    if (localStorage.getItem('accesToken')) {
        return props.children
    } else {
        return <Navigate to='/admin/' />
    }

}

export default Adminprotect
