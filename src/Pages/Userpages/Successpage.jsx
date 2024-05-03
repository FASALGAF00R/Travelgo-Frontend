import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

function Successpage() {


    const navigate = useNavigate()
    const handleClick = () => {
        setTimeout(() => {
            navigate('/')
        }, 2000);
    }



    return (
        <>
                    <div class="mt-20"></div>
            <div className='w-full h-screen flex items-center justify-center mt-12'>
                <div className=''>
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/payment-success-4320185-3598820.png" alt="" className='' />
                    <div className='text-center font-semibold ml-14 mb-10'>
                        <h1 className='mb-6 font-semibold text-4xl text-green-600'>Success</h1>
                        <h1 className='font-sans text-xl'>Your payment has been processed successfully</h1>
                        <h1 className='mt-4 font-thin text-md text-light-green-900'>Page while be automatically redirected to the main page or click button below</h1>
                        <div className='flex flex-row justify-center items-center gap-14'>
                            <div className='mt-12'>
                                <Link to='/userbookings' className='border-2 border-gray-600 p-2 rounded-md text-gray-600 hover:bg-cyan-700 hover:text-white'>Bookings</Link>
                            </div>
                            <div className='mt-12'>
                                <button onClick={handleClick} className='border-2 border-gray-600 p-2  rounded-md text-gray-600 hover:bg-gray-800 hover:text-white'>Back to home</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <div class="mb-20"></div>
        </>
    )
}

export default Successpage