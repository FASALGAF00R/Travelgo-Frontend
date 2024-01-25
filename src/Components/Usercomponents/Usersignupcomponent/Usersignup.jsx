import React, { useState } from 'react';
import { signupData } from '../../../Api/Userapi';
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import signupic from '../../../Assests/Images/signupic.png'


const Usersignup = () => {
  const navigate = useNavigate()
  const [user, setuser] = useState({
    userName: '',
    email: '',
    password: '',
    ConfirmPassword: ''

  });

  const { userName, email, phone, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };



  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left"
    })




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("4");
      const userData = await signupData(user);
      toast(userData.data.message)
      console.log(userData, '000000000000000000');

    } catch (err) {

      handleError("An error occurred");

    }
    console.log(user, "user");

    setuser({
      ...user,
      userName: '',
      email: '',
      password: '',
      ConfirmPassword: ''
    });
  };
  return (
    <>
      <div className="flex items-center justify-center h-auto">
        <div className='bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center mt-10 rounded-md' >
          <img
            className="w-1/3 h-auto  rounded-l-md  object-cover" src={signupic} alt="signup image" />

          <div className="flex flex-col bg- [#ee8e8e] rounded-lg mt-3 shadow-lg dark:bg-gray-800 mr-11 lg:px-10">
            <div className="self-center mb-5 mt-5 text-xl font-semibold text-black-800 sm:text-2xl dark:text-white">
              Sign up
            </div>
            <span className="justify-center text-sm text-center gap-3 font-thin text-gray-800 flex items-center dark:text-gray-400">
              Already have an account?
              <Link to="/login" className="text-sm text-blue-500 underline hover:text-blue-700">
                Sign in
              </Link>
            </span>

            <div className="p-10 py-2 ">
              <form onSubmit={handleSubmit}>
                <div className="flex  mb-1">
                  <div className="relative">
                    <input
                      type="text"
                      id="create-account-pseudo"
                      className="rounded-lg border-pink-500 flex-1 mt-5 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                      className="rounded-lg border-pink-500 mt-4 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-2">
                  <div className="relative">
                    <input
                      type="password"
                      id="create-account-email"
                      className="rounded-lg border-pink-500  mt-4 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
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
                      className="rounded-lg border-pink-500 mt-4 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      name="ConfirmPassword"
                      value={user.ConfirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
                <div className="flex w-full my-10">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#dc5151] hover:bg-pink-400 focus:ring-pink-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-thin shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <ToastContainer />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usersignup;
