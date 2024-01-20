import React, { useState } from 'react';
import {  signupData } from '../../../Api/Userapi';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate  } from 'react-router-dom';

const Usersignup = () => {
  const navigate = useNavigate()
  // const { token } = useParams();

  const [user, setuser] = useState({
    userName: '',
    email: '',
    password: '',
  });
  console.log(user, "user 1");
  const { userName, email, phone, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, "2");
    console.log(e.target, "3");
    setuser({
      ...user,
      [name]: value,
    });
  };



  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left"
    })


  const handleSucces = (msg) =>
    toast.success(msg, {
      postion: "bottom-right"
    })




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("4");
      const userData = await signupData(user);
        toast(userData.data.message)
        console.log(userData,'000000000000000000');
  
    } catch (err) {
      console.log(err);
      handleError("An error occurred");

    }

    setuser({
      ...user,
      userName: '',
      email: '',
      password: '',
    });

  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">

        <div className="flex flex-col  max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-5 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
            Sign up
          </div>
          <span className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
            Already have an account ?
            <a href="/login" target="_blank" className="text-sm text-blue-500 underline hover:text-blue-700">
              Sign in
            </a>
          </span>
          <div className="p-6 mt-8">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="text"
                    id="create-account-pseudo"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    id="create-account-first-name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="flex gap-4 mb-2">
                <div className="relative">
                  <input
                    type="text"
                    id="create-account-first-name"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="password"
                    id="create-account-email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="relative">
                  <input
                    type="password"
                    id="create-account-email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name=" password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              <div className="flex w-full my-10">
                <button
                  type="submit"
                  className="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
                  Register
                </button>
              </div>
            </form>
            <ToastContainer />

          </div>
        </div>
      </div>
    </>
  );
};

export default Usersignup;
