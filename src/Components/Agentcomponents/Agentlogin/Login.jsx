import React from 'react'
import { useState, useEffect } from 'react'
import { Formdata } from '../../../Api/Agentapi'
import { agentdata } from '../../../Api/Agentapi'; 
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login() {
  const navigate = useNavigate()

  const [google, setgoogle] = useState([])
  const [agent, setagent] = useState({
    email: '',
    password: '',

  })


  const handlechange = (e) => {
    const { name, value } = e.target
    setagent({
      ...agent,
      [name]: value
    })
  }


  const Googleauth = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(google.access_token, "token");
      setgoogle(codeResponse)

    },
    onError: (error) => console.log('Login Failed:', error)

  })


  useEffect(() => {

    const fetchdata = async () => {
      if (google) {
        console.log(google, "iiiiiiiiiiiiiiiiiiiiiii");

        try {
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google.access_token}`, {
            headers: {
              Authorization: `Bearer ${google.access_token}`,
              Accept: 'application/json'
            }
          })
          console.log(res, "hgfjdgjfghjfgk");
          const result = await agentdata(res)
          console.log(result, "nnnnnnnnnnn")
          if(result.data.success){
            toast(result.data.message)
            navigate('/agent/')
          }else{
            toast.error('error got')
          }
        } catch (error) {
          console.error("Error fetching Google data:", error);
        }
      }
    }
    fetchdata()


  },
    [google, navigate]

  );




  const handlesubmitdata = async (e) => {
    console.log("kerri");
    e.preventDefault();
    try {
      console.log("kerriiiiiiiiii");

      if (!agent.email || !agent.password) {
        toast.error("fields required")
      }

      const res = await Formdata(agent)
      console.log(res, "response");
      if (res.data.message) {
        toast.success(res.data.message)
        setTimeout(() => {
          localStorage.setItem('token', res.data.token)
          navigate('/agent/');
        }, 2000);
      }else{
        toast(res.data.message)

      }  

    } catch (error) {
      console.log(error);
      toast.error(res.data.message)

    }
  }


  return (
    <>
      <div className='flex justify-center items-center '>
        <div className='bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center mt-10 rounded-md' >
          <div className='flex  justify-center gap-4 font-semibold text-lg items-center w-[50%] h-full'>


            {/* <img className="w-5/6 h-5/6  rounded-l-md" src={} alt="loginimage" /> */}
          </div>

          <div className="flex items-center justify-center shadow-2xl h-auto 2xl:mr-16">

            <form className="bg-#db8c8c  rounded px-8 pt-6 pb-8 mb-4 w-96 " onSubmit={handlesubmitdata}>
              <div className="md-4  text-gray-900  font-extrabold"  >
                Agent login
                <label className="block text-gray-900 text-sm mt-8 font-light mb-2" >
                  Email
                </label>
                <input
                  className="shadow appearance-none border-pink-500  w-full py-2 px-3 text-gray-700 leading-tight font-light rounded-full"
                  id="email"
                  type="text"
                  name="email"
                  value={agent.email}
                  onChange={handlechange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-800 text-sm mt-6 font-light mb-2" >
                  Password
                </label>
                <input
                  className="shadow appearance-none  border-pink-500  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-full"
                  id="password"
                  type="password"
                  name="password"
                  value={agent.password}
                  onChange={handlechange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className=" bg-[#dc5151] hover:bg-pink-400 text-white  mt-2 font-light py-1 px-20 ml-12 rounded-full  "
                  type="submit"
                >
                  Log In
                </button>
              </div>
              <br>
              </br>
              <span className="justify-center text-sm  text-center ml-10 text-gray-800 flex-items-center font-light dark:text-gray-400">
                Doesn't have an account?
                <Link to="/agent/signup" className="text-sm  ml-3 text-pink-800 underline hover:text-blue-700">
                  Sign up
                </Link>
              </span>
              <div class="px-6 sm:px-0 max-w-sm" onClick={() => Googleauth()}>
                <button type="button" class="  text-white w-50% mt-4 -ml-35 bg-[#dc5151] hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 "><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Login with Google<div></div></button>
              </div>
            </form>   
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
