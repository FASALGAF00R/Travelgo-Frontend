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
import Aboutpage from '../../Pages/Userpages/Aboutpage'
import  Error404  from '../../Pages/Errorpages/Error404.jsx'
import Booking from '../../Pages/Userpages/Booking.jsx'
import Listbookings from '../../Pages/Userpages/Listbookings.jsx'
import Successpage from '../../Pages/Userpages/Successpage.jsx'
import Listwalletbookings from '../../Pages/Userpages/Listwalletbookings.jsx'

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
          <Route path='/booking' element={<Userprotected><Booking/></Userprotected>  } />
          <Route path='/success' element={<Userprotected><Successpage/></Userprotected>  } />
          <Route path='/userbookings' element={<Userprotected><Listbookings/></Userprotected>  } />
          <Route path='/wallethistory' element={<Userprotected><Listwalletbookings/></Userprotected>  } />
          <Route path='/about' element={<Aboutpage />} />
          <Route path="*" element={<Error404 />} />

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

        <Route path="/verify/:token" element={ <Verification />} />
        <Route path='/forgotpass' element={<Forgotpass />} />
        <Route path='/otpverify' element={<Otppass />} />
        <Route path='/newpass' element={<Newpass />} />
      </Routes>

    </div>
  )
}
                                                                                                                                                                                                                                                                                                                                                                                                                              
export default {UserRoutes}
