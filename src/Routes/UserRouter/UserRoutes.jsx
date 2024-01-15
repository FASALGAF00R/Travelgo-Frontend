import Home from '../../Pages/Userpages/Home'
import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Usersignup from '../../Components/Usercomponents/Usersignupcomponent/Usersignup'
import Login from '../../Components/Usercomponents/Userlogincomponent/Login'
import { Link } from 'react-router-dom'

function UserRoutes() {


  return (
    <div>

  <Routes>
 
<Route path="/" element={<Home/>}/>
<Route path="/signup" element={<Usersignup/>}/>
<Route path="/login" element={<Login/>}/>

  </Routes>
 
    </div>
  )
}

export default UserRoutes
