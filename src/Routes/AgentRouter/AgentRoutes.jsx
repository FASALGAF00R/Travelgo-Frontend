import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Agentsignup from '../../Components/Agentcomponents/Agentsignup/Agentsignup'
function AgentRoutes() {

  return (
    <div>
        <Routes>
            
<Route path='/signup' element={<Agentsignup/>} />




        </Routes>




    </div>
  )
}

export default AgentRoutes