import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Home from '../../Pages/Adminpages/Home'
import Users from '../../Pages/Adminpages/Users'

function AdminRoutes() {
  return (
    <div>
             <Routes>
<Route path='/login' element ={<Login/>}/>
<Route path='/home' element ={<Home/>}/>
<Route path='/users' element ={<Users/>}/>


        </Routes>
    </div>
  )
}

export default AdminRoutes
