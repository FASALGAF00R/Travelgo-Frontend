import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Home from '../../Pages/Adminpages/Home'
import Users from '../../Pages/Adminpages/Users'
// import Agents from '../../Pages/Adminpages/Agents'
import Adminlayout from '../../Pages/Adminpages/Adminlayout/Adminlayout'
import Approval from '../../Pages/Adminpages/Approval'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route element={<Adminlayout />}>
          <Route path='/users' element={<Users />} />
          {/* <Route path='/agents' element={<Agents />} /> */}
          <Route path='/approval' element={<Approval/>} />

          </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes
