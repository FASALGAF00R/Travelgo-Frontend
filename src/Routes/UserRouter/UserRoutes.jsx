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
import Newpass from '../../Components/Usercomponents/Userpassword/Newpass'
import Userprofile from '../../Pages/Userpages/Userprofile'
import Userprotected from '../../Utils/Protected/Userprotected'
import Packagespage from '../../Pages/Userpages/Packagespage'
import Packagesdetail from '../../Pages/Userpages/Packagesdetail'
import Demo from '../../Pages/Userpages/Demo'


function UserRoutes() {

console.log("userroutes");
  return (
    <div>

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/destinations" element={<Userprotected><Destination /></Userprotected> } />
          <Route path="/" element={<Home />} />
          <Route path='/profile' element={<Userprotected><Userprofile /></Userprotected>  } />
          <Route path='/packages' element={<Userprotected><Packagespage /></Userprotected>  } />
          <Route path='/packagedetails' element={<Userprotected><Packagesdetail /></Userprotected>  } />

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

        <Route path='/demo' element={<Demo />} />
        <Route path="/verify/:token" element={ <Verification />} />
        <Route path='/forgotpass' element={<Forgotpass />} />
        <Route path='/otpverify' element={<Otppass />} />
        <Route path='/newpass' element={<Newpass />} />
      </Routes>

    </div>
  )
}
                                                                                                                                                                                                                                                                                                                                                                                                                              
export default UserRoutes
