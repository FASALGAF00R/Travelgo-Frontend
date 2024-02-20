import React from 'react'
import { Navigate } from 'react-router-dom'

function Adminprotect(props) {
    if (localStorage.getItem('accesToken')) {

        return <Navigate to='/admin/' />
    } else {
        <Navigate to='/login' />
        return props.children
    }


}

export default Adminprotect
