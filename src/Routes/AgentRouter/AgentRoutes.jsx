import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Agentsignup from '../../Components/Agentcomponents/Agentsignup/Agentsignup'
import Agentverify from '../../Components/Agentcomponents/Agentlogin/Agentverify'
import Login from '../../Components/Agentcomponents/Agentlogin/Login'
import Agentlayout from '../../Pages/Agentpages/Agentlayout/Agentlayout'
import Places from '../../Pages/Agentpages/Places'
import DashBoard from '../../Pages/Agentpages/DashBoard'
import Activies from '../../Pages/Agentpages/Activies'
import Packages from '../../Pages/Agentpages/Packages'
import Agentpublic from '../../Utils/Protected/Agentpublic'
import Agentprotect from '../../Utils/Protected/Agentprotect'



function AgentRoutes() {

 






  return (
    <div>
      <Routes>
        <Route path='/Login' element={<Agentpublic> <Login /></Agentpublic>} />
        <Route path='/signup' element={<Agentpublic> <Agentsignup /> </Agentpublic>} />
        <Route path='/verify/:token' element={<Agentverify />} />
        <Route element={<Agentprotect> <Agentlayout /> </Agentprotect>}>
          <Route path='/' element={<Agentprotect>  < DashBoard /> </Agentprotect>} />
          <Route path='/places' element={<Agentprotect>  < Places />  </Agentprotect>} />
          <Route path='/activites' element={<Agentprotect> <Activies /> </Agentprotect>} />
          <Route path='/packages' element={<Agentprotect>  <Packages /> </Agentprotect>} />
        </Route>
      </Routes>
    </div>
  )
}

export default AgentRoutes