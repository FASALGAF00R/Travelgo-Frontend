import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Home from '../../Pages/Adminpages/Home'
import Users from '../../Pages/Adminpages/Users'
import Agents from '../../Pages/Adminpages/Agents'

function AdminRoutes() {
  return (
    <div>
             <Routes>
<Route path='/login' element ={<Login/>}/>
<Route path='/home' element ={<Home/>}/>
<Route path='/users' element ={<Users/>}/>
<Route path='/agents' element ={<Agents/>}/>


        </Routes>
    </div>
  )
}

export default AdminRoutes
