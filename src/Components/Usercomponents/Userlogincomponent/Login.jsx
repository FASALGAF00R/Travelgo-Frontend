import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Googledata } from '../../../Api/Userapi';
import { Userlogin } from '../../../Api/Userapi';





const Login = () => {


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
        console.log(user, "iiiiiiiiiii");

        try {
          const Google = axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          console.log(Google, "googlefhdh");

          const result = await Googledata(Google)
          console.log(result.data,"result");

          // toast(result.data.alert);
          if (result.data.success === true) {
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
      const res = await Userlogin(formData)
      const { message } = res;
      if (res.data.Data.isVerified) {
        toast.success(res.data.message)
        setTimeout(() => {
          localStorage.setItem('token', res.data.Data.token)
          navigate("/");
        }, 2000);
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

      <div onClick={() => Googleauth()}>
        <h2> Google Login</h2>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
