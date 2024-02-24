import React from 'react'
import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { Signupdata } from '../../../Api/Agentapi.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { RouteObjects } from '../../../Routes/RouteObject.js';
import agentsignupImage from '../../../Assests/Images/agentsignupImage.jpg'

function Agentsignup() {

  const navigate = useNavigate()

  const [Data, setData] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirmpassword: ""
  })



  const handlechange = (e) => {

    const { name, value } = e.target

    if (name === 'phone' && !/^\d{0,10}$/.test(value)) {
      return;
    }
    setData({
      ...Data,
      [name]: value
    })
  }


  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    return (
      password.length >= minLength &&
      hasNumber &&
      hasLetter
    );
  }


  const formdata = async (e) => {
    e.preventDefault();
    try {
      if (Data.password !== Data.confirmpassword) {
        toast.error('password incorrect')
      }


      if (!Data.userName || !Data.email || !Data.phone || !Data.password) {
        toast.error('fields required');
      } else if (!/^\d{10}$/.test(Data.phone)) {
        toast.error('Phone number must be 10 digits');
      } else if (!validatePassword(Data.password)) {
        toast.error("Password: 6+ chars, letters & numbers.");
      } else {
        const res = await Signupdata(Data)
        if (res.data.newagent) {
          toast.success(res.data.message)
          setTimeout(() => {
            navigate(RouteObjects.Login)
          }, 2000);
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (


    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-[violet]-500  bg-pink-50">
      <div className='bg-gradient-to-r from-[#a0c0ca] to-[#da8484] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center  rounded-md' >
         <img
            className="w-2/5 h-5/6  rounded-l-md  object-cover mr-9" src={agentsignupImage} alt="signup image" /> 

        <div className="flex flex-col bg- [#ee8e8e] rounded-lg  shadow-2xl dark:bg-gray-800 mr-11 lg:px-10">
          <div className="self-center mb-5 mt-5 text-xl font-semibold text-black-800 sm:text-2xl dark:text-white">
            Agent Sign up
          </div>
          <span className="justify-center text-sm text-center gap-3 font-thin text-gray-800 flex items-center dark:text-gray-400">
            Already have an account  ?
            <Link to="/agent/login" className="text-sm  underline hover:text-blue-700">
              Sign in
            </Link>
          </span>

          <div className="p-10 py-2 ">
            <form onSubmit={formdata}>
              <div className="flex  mb-1">
                <div className="relative">
                  <input
                    type="text"
                    id="create-account-pseudo"
                    className="rounded-lg border-pink-500 flex-1 mt-5 appearance-none border w-72 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    name="userName"
                    value={Data.userName}
                    onChange={handlechange}
                    placeholder="Agent name"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    id="create-account-first-name"
                    className="rounded-lg border-pink-500 mt-4 flex-1 appearance-none border w-72 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    name="email"
                    value={Data.email}
                    onChange={handlechange}
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="password"
                    id="create-account-email"
                    className="rounded-lg border-pink-500  mt-4 flex-1 appearance-none border w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
                    name="password"
                    value={Data.password}
                    onChange={handlechange}
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="password"
                    id="create-account-email"
                    className="rounded-lg border-pink-500  mt-4 flex-1 appearance-none border w-full py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
                    name="confirmpassword"
                    value={Data.confirmpassword}
                    onChange={handlechange}
                    placeholder="confirm password"
                  />
                </div>
              </div>



              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="tel"
                    id="create-account-phone"
                    className="rounded-lg border-pink-500 mt-4 flex-1  border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
                    name="phone"
                    value={Data.phone}
                    onChange={handlechange}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="flex w-full my-10">
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#dc5151] hover:bg-pink-400 focus:ring-pink-500 hover:scale-110 text-white w-full transition ease-in duration-200 text-center text-base font-thin shadow-md focus:outline-none  rounded-lg"
                >
                  Sign up
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <Toaster />
    </div>



  )
}

export default Agentsignup