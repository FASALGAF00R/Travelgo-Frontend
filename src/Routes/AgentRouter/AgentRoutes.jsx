import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Agentsignup from '../../Components/Agentcomponents/Agentsignup/Agentsignup'
import Agentverify from '../../Components/Agentcomponents/Agentlogin/Agentverify'
import Login from '../../Components/Usercomponents/Userlogincomponent/Login'
import Home from '../../Pages/Agentpages/Home'
function AgentRoutes() {

  return (
    <div>
        <Routes>
<Route path='/home' element={<Home/>}/>    
<Route path='/signup' element={<Agentsignup/>} />
<Route path='/verify/:token' element={<Agentverify/>}/>
<Route path='/login' element ={<Login/>}/>


        </Routes>




    </div>
  )
}

export default AgentRoutes