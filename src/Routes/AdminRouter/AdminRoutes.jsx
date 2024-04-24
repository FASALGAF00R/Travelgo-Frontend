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
import Adminpublic from '../../Utils/Protected/Adminpublic'
import Destinations from '../../Pages/Adminpages/Destinations'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Adminpublic> <Login/> </Adminpublic> }/>
        <Route element={<Adminprotect>  <Adminlayout /> </Adminprotect>     }>
          <Route path='/' element={<Adminprotect> <Dashboard/> </Adminprotect>} />
          <Route path='/category' element={<Adminprotect> <Packagecategory /> </Adminprotect>} />
          <Route path='/users' element={<Adminprotect>  <Users /> </Adminprotect> } />
          <Route path='/agents' element={<Adminprotect>  <Agents /> </Adminprotect>} />
          <Route path='/approval' element={<Adminprotect>  <Approval /> </Adminprotect>  } />
          <Route path='/destination' element={<Adminprotect>  <Destinations /> </Adminprotect>  } />

        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
