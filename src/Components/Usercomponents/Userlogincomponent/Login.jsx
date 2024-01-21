import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Googledata } from '../../../Api/Userapi';
import { useLocation } from 'react-router-dom';
import { Agentlogin } from '../../../Api/Agentapi';
import { Userlogin } from '../../../Api/Userapi';

const Login = () => {

  const Location = useLocation()
  console.log(Location.state, "ooooooooodddd");
  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const [formData, setFormData] = useState({

    email: '',
    password: '',
  });
  const { email, password } = formData;

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


  const Googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)

  })




  useEffect(() => {
    const fetchdata = async () => {
      console.log("useeffect");
      if (user) {
       const Google=  axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        console.log(Google,"google");
       const result=await  Googledata(Google)
       toast(result.data.alert);
              if (result.data.success === true) {
                navigate("/");
              } else {
                console.log("errorr  got");
              }
                }
    }
    fetchdata()
  },
    [user]

  );



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(Location.state);
      if (Location.state === "user") {
        console.log("jjjjjjjjjjj");
        const res = await Userlogin(formData)
        const { message } = res;
        console.log("8");
        if (res.data.Data.isVerified) {
          toast.success(res.data.message)
          setTimeout(() => {
            localStorage.setItem('token', res.data.Data.token)
            navigate("/");
          }, 2000);
        }
      } else if (Location.state == "agent") {
        console.log('ooooooo=====');
        const response = await Agentlogin(formData)
        console.log(response, "hhhhhhhhh");
        if (response.data.Agent.isVerified) {
          toast.success(response.data.message)
          setTimeout(() => {
            localStorage.setItem('token', response.data.Agent.token)
            navigate("/home");
          }, 2000);
        } else {
         toast.error(response.data.message)
        }
      }


    } catch (error) {
      console.log(error);
      handleError("An error occurred");

    }


  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
        <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
            Does'nt  have a account ?
            <a href="/signup" target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">
              Sign up
            </a>
          </span>
      </form>

      <div onClick={() => Googlelogin()}>
        <h2> Google Login</h2>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
