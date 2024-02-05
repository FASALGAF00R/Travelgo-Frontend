import React from 'react'
import { NavbarSimple } from '../../../Components/Usercomponents/Userhomecomponent/Navbar'
import { Outlet } from 'react-router-dom'
import Service from '../../../Components/Usercomponents/Userhomecomponent/Service'

const UserLayout =()=> {
  return (
    <div>
      <NavbarSimple/>
      <Outlet/>
      <Service/>
    </div>
  )
}

export default UserLayout
