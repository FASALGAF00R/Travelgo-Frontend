import React from 'react'
import { Outlet } from 'react-router-dom'
import AgentSideBar from './AgentSideBar'
import Adminheader from '../../../Components/Admincomponents/Adminheader'

function Agentlayout() {
    return (

          
       
        <div className='flex w-full'>
            <div className='W-[20%] '>
                <AgentSideBar />
            </div>
            <div className='w-screen'>
                <Adminheader/>
            <Outlet />
            </div>

        </div>
    
    )
}

export default Agentlayout
