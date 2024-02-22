import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Agentsignup from '../../Components/Agentcomponents/Agentsignup/Agentsignup'
import Agentverify from '../../Components/Agentcomponents/Agentlogin/Agentverify'
import Login from '../../Components/Agentcomponents/Agentlogin/Login'
import Agentlayout from '../../Pages/Agentpages/Agentlayout/Agentlayout'
import Places from '../../Pages/Agentpages/Places'
import DashBoard from '../../Pages/Agentpages/DashBoard'
import Activies from '../../Pages/Agentpages/Activies'
import Packages from '../../Pages/Agentpages/Packages'

function AgentRoutes() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/verify/:token' element={<Agentverify />} />
        <Route path='/signup' element={<Agentsignup />} />
        <Route element={<Agentlayout />}>
          <Route path='/' element={< DashBoard />} />
          <Route path='/places' element={< Places />} />
          <Route path='/activites' element={<Activies/>} />
          <Route path='/packages' element={<Packages/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default AgentRoutes