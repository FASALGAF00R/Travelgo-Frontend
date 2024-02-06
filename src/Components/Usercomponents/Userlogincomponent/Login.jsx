import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Googledata } from '../../../Api/Userapi';
import { Userlogin } from '../../../Api/Userapi';
import loginpic from '../../../Assests/Images/loginpic.jpg'
import { jwtDecode } from "jwt-decode";






const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });


  const Googleauth = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(user.access_token, "token");
      setUser(codeResponse)

    },
    onError: (error) => console.log('Login Failed:', error)
  })

  useEffect(() => {
    const fetchdata = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          console.log(response, "googlefhdh");

          const result = await Googledata(response)
          toast(result.data.message)
          console.log(result, "result");
          if (result.data.data.isBlock === true) {
            navigate("/");
          } else {
            console.log("errorr  got");

          }
        } catch (error) {
          console.error("Error fetching Google data:", error);
        }
      }
    }

    fetchdata()
  },
    [user, navigate]

  );



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (formData.email == '') {
        toast.error('please add email')
      } else if (formData.password == '') {
        toast.error('please add password')
      } else {
        const res = await Userlogin(formData)
        if (res.data.Data) {
          localStorage.setItem('accesToken', res.data.accesToken)  
          toast.success(res.data.Data.message)       
          navigate('/')
      
        } else {
          toast.error(res.data.message)
        }

      }
    } catch (error) {
      console.log(error);

    }

  };

  return (
    <div className='flex justify-center items-center  bg-pink-50'>
      <div className='bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center mt-10 rounded-md' >
        <div className='flex  justify-center items-center w-[50%] h-full'>

          <img className="w-5/6 h-5/6  rounded-l-md" src={loginpic} alt="loginimage" />
        </div>

        <div className="flex items-center justify-center shadow-2xl h-auto 2xl:mr-16">

          <form className="bg-#db8c8c  rounded px-8 pt-6 pb-8 mb-4 w-96 " onSubmit={handleSubmit}>
            <div className="md-4  text-gray-900  font-extrabold"  >
              Please enter your login credentials to login
              <label className="block text-gray-900 text-sm mt-8 font-light mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border-pink-500  w-full py-2 px-3 text-gray-700 leading-tight font-light rounded-full"
                id="email"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 text-sm mt-6 font-light mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none  border-pink-500  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-full"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
              <Link to="/forgotpass" className="text-sm  ml-3 text-gray-800 underline hover:text-blue-700">
              forgot password? 
              </Link>
            <div className="flex items-center justify-between">
              <button
                className=" bg-[#dc5151] hover:bg-pink-400 text-white  mt-4 font-light py-1 px-20 ml-12 rounded-full  "
                type="submit"
              >
                Log In
              </button>
            </div>
            <br>
            </br>
            <span className="justify-center text-sm  text-center ml-10 text-gray-800 flex-items-center font-light dark:text-gray-400">
              Doesn't have an account?
              <Link to="/signup" className="text-sm  ml-3 text-pink-800 underline hover:text-blue-700">
                Sign up
              </Link>
            </span>
            <div class="px-6 sm:px-0 max-w-sm" onClick={() => Googleauth()}>
              <button type="button" class="  text-white w-50% mt-4 -ml-35 bg-[#dc5151] hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 "><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Login with Google<div></div></button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
