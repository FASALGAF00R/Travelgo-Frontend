import React from 'react'
import { Outlet } from 'react-router-dom'
import AgentSideBar from './AgentSideBar'

function Agentlayout() {
    return (
        <div className='flex w-full'>
            <div className='W-[20%] '>
                <AgentSideBar />
            </div>
            <div className='W-[80%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Agentlayout
