import React from 'react'
import { useState, useEffect } from 'react'
import { Formdata } from '../../../Api/Agentapi'
import { agentdata } from '../../../Api/Agentapi'; 
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import agentloginpic from '../../../Assests/Images/agentloginpic.jpg'
import { RouteObjects } from '../../../Routes/RouteObject';

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

        try {
          const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${google.access_token}`, {
            headers: {
              Authorization: `Bearer ${google.access_token}`,
              Accept: 'application/json'
            }
          })
          const result = await agentdata(res)
          if(result.data.success){
            toast(result.data.message)
            setTimeout(() => {
              navigate(RouteObjects.Home)           
            }, 2000);
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

  const handleForgot=()=>{
    navigate( RouteObjects.ForgetPassword,{state:{role:'agent'}})
  }


  const handlesubmitdata = async (e) => {
    e.preventDefault();
    try {
      if (!agent.email || !agent.password) {
        toast.error("fields required")
      }else{
      const res = await Formdata(agent)
      console.log(res, "response");
      if (res.data.success) {
        toast.success(res.data.message)
        setTimeout(() => {
          localStorage.setItem('token', res.data.token)
          navigate('/agent/');
        }, 2000);
      }else{
        toast.error(res.data.message)

      }  
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


            <img className="w-5/6 h-5/6  rounded-l-md" src={agentloginpic} alt="loginimage" />
          </div>

          <div className="flex  flex-col items-center justify-center shadow-2xl h-auto 2xl:mr-16">

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

              <button onClick={handleForgot}  className="text-sm  ml-3 text-gray-800 underline hover:text-blue-700">
              Forgot password  ?
            </button>


              
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
            </form>   
            <div class="sm:px-0 max-w-sm mb-3 " onClick={() => Googleauth()}>
              <button className="px-6 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg " loading="lazy" alt="google logo"></img>
                <span>Login with Google</span>
              </button>
            </div>
      <Toaster />
          </div>
        </div>
      </div>
    </>
 
  )
}

export default Login
