import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Users from '../../Pages/Adminpages/Users'
import Adminlayout from '../../Pages/Adminpages/Adminlayout/Adminlayout'
import Approval from '../../Pages/Adminpages/Approval'
import Dashboard from '../../Pages/Adminpages/Dashboard'
import Packagecategory from '../../Pages/Adminpages/Packagecategory'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<Adminlayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/approval' element={<Approval />} />
          <Route path='/category' element={<Packagecategory />} />

        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes
