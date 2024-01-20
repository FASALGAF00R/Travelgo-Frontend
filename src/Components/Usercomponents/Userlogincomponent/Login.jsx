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
  console.log(Location.state, "ooooooooo");
  const navigate = useNavigate();
  const [user, setUser] = useState([])
  const [formData, setFormData] = useState({

    email: '',
    password: '',
  });
  console.log(formData, " 1 form data");
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "2");
    console.log(e.target, "3");
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
        const res = axios.post(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
          .then((res) => {
            // setProfile(res.data);
            Googledata(res.data).then((res) => {

              if (res.data.success === true) {
                navigate("/");
              } else {
                console.log("errorr  got");
              }
            })
          })
          .catch((err) => console.log(err));
      }
    }
    fetchdata()
  },
    [user]

  );



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('pspsps');
      console.log(Location.state);
      if (Location.state === "user") {
        console.log("jjjjjjjjjjj");
        const res = await Userlogin(formData)
        const { message } = res;
        console.log("8");
        if (res.data.Data.isVerified) {
          handleSuccess(message);
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
      </form>

      <div onClick={() => Googlelogin()}>
        <h2> Google Login</h2>

      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
