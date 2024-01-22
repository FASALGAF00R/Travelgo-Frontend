import React from 'react'
import { useState } from 'react'
import { Formdata } from '../../../Api/Agentapi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer ,toast } from "react-toastify";

function Login() {
const navigate=useNavigate()
    const [agent, setagent] = useState({
        email:'',
        password:'',

    })


const handlechange =(e)=>{
    const {name,value}=e.target
    setagent({
        ...agent,
        [name]:value
    })
}

const handlesubmitdata= async (e)=>{
    console.log("yyyyyyyyy");
    try {
        e.preventDefault();
        const res =await Formdata(agent)
        if(res.data.message){
            toast.success(res.data.message)
            setTimeout(() => {
                localStorage.setItem('token', res.data.Agent.token)
                navigate('/home');
              }, 2000);
        }
    } catch (error) {
        console.log(error);
    }
}


    return (
        <>

            <div className="flex min-h-full flex-1  my-10 flex-col justify-center px-6 py-10 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Login  to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handlesubmitdata} >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    value={agent.email}
                                    onChange={handlechange}
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={agent.password}
                                    onChange={handlechange}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-pink-300 px-3 py-1.5 my-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <ToastContainer/>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">

                        </a>
                    </p>
                </div>
            </div>

        </>
    )
}

export default Login
