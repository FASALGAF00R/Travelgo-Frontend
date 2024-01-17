import React, { useState } from 'react';
import { Userlogin } from '../../../Api/Userapi';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();

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
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });






  const handleSubmit =async (e) => {
    console.log("4");
    e.preventDefault();
    try {
     const res=   await Userlogin(formData)
        console.log('Login form submitted:',res);  

        const { success, message } = res;
        if (res.data.Data.isVerified) {
          console.log("8");

            handleSuccess(message);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            handleError(message);
          }
    } catch (error) {
        console.log(error);
        handleError("An error occurred");

    }
    setFormData({
        ...formData,
        email: '',
        password: '',
    })
  
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
      <ToastContainer/>
    </div>
  );
};

export default Login;
