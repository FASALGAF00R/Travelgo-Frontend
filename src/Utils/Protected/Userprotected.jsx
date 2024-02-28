import React from 'react'
import { Navigate } from 'react-router-dom'

function Userprotected(props) {
    if (localStorage.getItem('accesToken')) {
        return props.children
    } else {

        return <Navigate to='/' />
    }

}

export default Userprotected
