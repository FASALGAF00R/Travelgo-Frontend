import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'

function AdminRoutes() {
  return (
    <div>
             <Routes>
<Route path='/login' element ={<Login/>}/>


        </Routes>
    </div>
  )
}

export default AdminRoutes
