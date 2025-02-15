import React from 'react'
import { Navigate } from 'react-router-dom'

function Userpublic(props) {

    console.log("userroutespublic");

    if (localStorage.getItem('accesToken')) {
        return <Navigate to='/' />
    } else {
        <Navigate to='/login' />
        return props.children
    }

}

export default Userpublic

