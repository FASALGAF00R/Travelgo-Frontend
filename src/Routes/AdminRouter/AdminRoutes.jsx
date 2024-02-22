import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../../Components/Admincomponents/Adminlogin/Login'
import Users from '../../Pages/Adminpages/Users'
import Adminlayout from '../../Pages/Adminpages/Adminlayout/Adminlayout'
import Approval from '../../Pages/Adminpages/Approval'
import Dashboard from '../../Pages/Adminpages/Dashboard'
import Packagecategory from '../../Pages/Adminpages/Packagecategory'
import Adminprotect from '../../Utils/Protected/Adminprotect'
import Agents from '../../Pages/Adminpages/Agents'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<Adminlayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/category' element={<Packagecategory />} />
          <Route path='/users' element={<Users />} />
          <Route path='/agents' element={<Agents />} />
          <Route path='/approval' element={<Approval />} />
        </Route>



        <Route path='/login' element={
          <Adminprotect>
            <Login />
          </Adminprotect>
        } />

      </Routes>
    </div>
  )
}

export default AdminRoutes
