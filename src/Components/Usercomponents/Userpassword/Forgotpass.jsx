import React from 'react'
import { useState } from 'react'
import { Forgot } from '../../../Api/Userapi'
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteObjects } from '../../../Routes/RouteObject';

function Forgotpass() {
    const location = useLocation()
    console.log(location, 'ccc');
    const { role } = location.state;
    console.log(role, 'cccccccccccc');
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({
        email: '',
    })


    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata({
            [name]: value,
        }
        )
    }



    const Formsubmission = async (e) => {
        e.preventDefault()
        try {
            if (formdata.email === "") {
                toast.error("fields empty")
            } else {
                const Res = await Forgot(formdata)
                console.log(Res, "pop");
                if (Res.data.success === true) {
                    toast.success(Res.data.message)
                    setTimeout(() => {
                        navigate(RouteObjects.OTP, { state: { email: formdata.email, role: role } })

                    }, 2000);
                } else {
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
                <h1 className="text-xl font-semibold mb-4">Forgot password</h1>

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
                <Toaster />
            </div>
        </div>
    )
}

export default Forgotpass
