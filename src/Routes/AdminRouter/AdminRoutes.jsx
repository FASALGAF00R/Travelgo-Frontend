import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Home from '../../Pages/Adminpages/Home'
import Users from '../../Pages/Adminpages/Users'
// import Agents from '../../Pages/Adminpages/Agents'
import Adminlayout from '../../Pages/Adminpages/Adminlayout/Adminlayout'
import Approval from '../../Pages/Adminpages/Approval'
import Dashboard from '../../Pages/Adminpages/Dashboard'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Adminlayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          {/* <Route path='/agents' element={<Agents />} /> */}
          <Route path='/approval' element={<Approval />} />

        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes
