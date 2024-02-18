import React from 'react'
import { Outlet } from 'react-router-dom'
import Home from '../Home'
import Adminheader from '../../../Components/Admincomponents/Adminheader'

function Adminlayout() {
    return (
        <div className='flex w-full' >
            <div className='W-[20%] '>
                <Home />
            </div>
            <div className='w-screen'>
                <Adminheader />
                {/* <div className='W-[80%]'> */}
                <Outlet />
                {/* </div> */}
            </div>
        </div>
    )
}

export default Adminlayout
