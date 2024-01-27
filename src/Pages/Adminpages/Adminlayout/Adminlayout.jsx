import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../Home'

function Adminlayout() {
    return (
        <div className='flex w-full'y
        >
            <div className='W-[20%] '>
                <Home />
            </div>
            <div className='W-[80%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default Adminlayout
