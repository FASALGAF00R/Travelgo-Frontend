import React from 'react'
import { Navigate } from 'react-router-dom'

function Agentpublic(props) {
    if (localStorage.getItem('accesToken')) {
        return <Navigate to='/agent/' />
    } else {
        <Navigate to='/agent/login' />
        return props.children
    }
}

export default Agentpublic