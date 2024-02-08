import React from 'react'
import { useState } from 'react'
import { Forgot } from '../../../Api/Userapi'
import { ToastContainer, toast } from "react-toastify";
import {  useNavigate } from 'react-router-dom';

function Forgotpass() {
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        email: '',
    })


    const handlechange = (e) => {
        console.log("hii");
        const { name, value } = e.target
        setformdata({
            [name]: value,
        }
        )
    }



    const Formsubmission = async (e) => {
         e.preventDefault()
        try {
            if(formdata.email===""){
                toast.error("fields empty")
            }else{
            const Res = await Forgot(formdata)         
            if (Res.data.userdata) {
             setTimeout(()=>{
                toast.success(Res.data.message)
                navigate('/otpverify')
             },3000)
            }else{
                toast.error(Res.data.message)
            }
            }
        } catch (error) {
            console.log(error);
        }

    }




    return (
        <div className='bg-pink-50 min-h-screen flex items-center justify-center'>
        <div className="w-full sm:w-[35%] mx-10 bg-gradient-to-r from-[#bfd8e1] to-[#ee8e8e] p-8 rounded-xl shadow shadow-slate-300">
            <h1 className="text-xl font-semibold mb-4">Reset password</h1>
            <p className="text-slate-500 mb-4">Fill up the form to reset the password</p>

            <form onSubmit={Formsubmission}>
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email" className="pb-2">
                        <p className="font-medium mb-6 text-slate-700">Email address</p>
                        <input
                            id="email"
                            name="email"
                            value={formdata.email}
                            onChange={handlechange}
                            className="w-full py-3 border border-slate-200 rounded-xl px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter email address"
                        />
                    </label>
                    <button type="submit" className="w-full py-3 font-medium text-white bg-[#dc5151] hover:bg-pink-400 rounded-lg border-indigo-500 hover:shadow flex space-x-2 items-center justify-center">
                        <span>Verify</span>
                    </button>

                    <p className="text-center ">
                        Not registered yet?{' '}
                        <a href="/signup" className="  font-bg-[#dc5151] font-medium inline-flex space-x-1 items-center">
                            <span className=' hover:bg-light-blue-500'>Register now </span>
                        </a>
                    </p>
                </div>
            </form>
            <ToastContainer/>
        </div>
    </div>
    )
}

export default Forgotpass
