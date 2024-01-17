import Home from '../../Pages/Userpages/Home'
import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Usersignup from '../../Components/Usercomponents/Usersignupcomponent/Usersignup'
import Login from '../../Components/Usercomponents/Userlogincomponent/Login'
import Verification from '../../Components/Usercomponents/Userlogincomponent/Verification'
function UserRoutes() {


  return (
    <div>

  <Routes>
 
<Route path="/" element={<Home/>}/>
<Route path="/signup" element={<Usersignup/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/verify/:token" element={<Verification/>}/>


  </Routes>
 
    </div>
  )
}

export default UserRoutes
