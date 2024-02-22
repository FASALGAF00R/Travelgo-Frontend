import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Googledata } from '../../../Api/Userapi';
import { Userlogin } from '../../../Api/Userapi';
import loginpic from '../../../Assests/Images/loginpic.jpg'
import { jwtDecode } from "jwt-decode";
import { RouteObjects } from '../../../Routes/RouteObject';

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
            navigate(RouteObjects.Home);
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
      if (formData.email == ''&& formData.password == '') {
        toast.error('Please enter all fields!')
      } else if (formData.password == '') {
        toast.error('Please enter all fields')
      } else {
        const res = await Userlogin(formData)
        if (res.data.Data) {
          localStorage.setItem('accesToken', res.data.accesToken)
          localStorage.setItem('refreshToken', res.data.Refreshtoken)
          toast.success(res.data.Data.message)
          navigate(RouteObjects.UserHome)

        } else {
          toast.error(res.data.message)
        }

      }
    } catch (error) {
      console.log(error);

    }

  };
  const handleForgot = () => {
    navigate(RouteObjects.UserLogin, { state: { role: 'user' } })
  }

  return (
    <div className='flex justify-center items-center  bg-pink-50 '>
      <div className='bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center mt-10 rounded-md' >
        <div className='flex  justify-center items-center w-[50%] h-full'>

          <img className="w-5/6 h-5/6  rounded-l-md" src={loginpic} alt="loginimage" />
        </div>

        <div className="flex  flex-col items-center  shadow-2xl h-auto 2xl:mr-16 rounded-lg">

          <form className="bg-#db8c8c  rounded px-8 pt-6 pb-8 mb-4 w-96 " onSubmit={handleSubmit}>
            <div className="md-4  text-gray-900  font-extrabold"  >
              Please enter your login credentials to login
              <label className="block text-gray-900 text-sm mt-8 font-light mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border-pink-500  w-full py-2 px-3 text-black leading-tight font-light rounded-lg"
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
                className="shadow appearance-none  border-pink-500  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline rounded-lg"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
            <button onClick={handleForgot} className="text-sm  ml-3 text-gray-800 underline hover:text-blue-700">
              Forgot password  ?
            </button>
            <div className="flex items-center justify-between">
              <button
                className=" bg-[#dc5151] hover:bg-pink-400 hover:scale-110 text-white  mt-4 font-light py-1 px-20 ml-12 rounded-lg  "
                type="submit"
              >
                Log In
              </button>
            </div>
            <br>
            </br>
            <span className="justify-center text-sm  text-center ml-10 text-gray-800 flex-items-center font-light dark:text-gray-400">
              Doesn't have an account ?
              <Link to="/signup" className="text-sm  ml-3  underline hover:text-blue-700">
                Sign up
              </Link>
            </span>
            <br/>
            <br/>

          <div class="flex justify-center sm:px-0 max-w-sm  " onClick={() => Googleauth()}>
            <button className="px-6 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200  transition duration-150  hover:scale-110">
              <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg " loading="lazy" alt="google logo"></img>
              <span>Login with Google</span>
            </button>
          </div>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default Login;
