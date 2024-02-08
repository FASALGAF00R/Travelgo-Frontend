import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Newpassword } from '../../../Api/Userapi';
import {  useNavigate } from 'react-router-dom';

function Newpass() {
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === "" && confirmPassword === "") {
            toast.error('fields empty')
        }
        if (password != confirmPassword) {
            toast.error("password and confirmpassword doesn't match")
        }

        const Req = await Newpassword({password, confirmPassword})
      
        try {
            if(Req.data.userdata){
                toast.success(Req.data.message)
                navigate('/login')

            }else{
                toast.error("error got")
            }
      
        } catch (error) {
            console.log(error);
        }


    }
    return (
        <div className='bg-pink-50 min-h-screen flex items-center justify-center'>
            <div className="w-full sm:w-[35%] mx-10 bg-gradient-to-r from-[#bfd8e1] to-[#ee8e8e] p-8 rounded-xl shadow shadow-slate-300">
                <h3 ><strong>Enter new password </strong></h3>

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 font-medium text-lg text-gray-800">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2 font-medium text-lg text-gray-800">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}

                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-[#dc5151] hover:bg-pink-400 focus:outline-none rounded-xl"
                    >
                        Submit
                    </button>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Newpass
