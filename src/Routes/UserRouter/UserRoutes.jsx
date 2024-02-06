import Home from '../../Pages/Userpages/Home'
import { Routes, Route } from 'react-router-dom'
import React from 'react'
import Usersignup from '../../Components/Usercomponents/Usersignupcomponent/Usersignup'
import Login from '../../Components/Usercomponents/Userlogincomponent/Login'
import Verification from '../../Components/Usercomponents/Userlogincomponent/Verification'
import Destination from '../../Pages/Userpages/Destination'
import UserLayout from '../../Pages/Userpages/Userlayout/UserLayout'
import Userpublic from '../../Utils/Protected/Userpublic'
import Forgotpass from '../../Components/Usercomponents/Userpassword/Forgotpass'
import Otppass from '../../Components/Usercomponents/Userpassword/Otppass'


function UserRoutes() {


  return (
    <div>

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/destinations" element={<Destination />} />
          <Route path="/" element={<Home />} />

        </Route>

  


        <Route path='/login' element={
          <Userpublic >
            <Login />
          </Userpublic>
        } />

        <Route path="/signup" element={
          <Userpublic>
            <Usersignup />
          </Userpublic>
        } />

        <Route path="/verify/:token" element={<Verification />} />
       <Route path='/forgotpass' element={<Forgotpass/>}/>
       <Route path='/otpverify' element={<Otppass/>}/>
      </Routes>

    </div>
  )
}

export default UserRoutes
