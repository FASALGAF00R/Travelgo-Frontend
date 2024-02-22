import React, { useState } from 'react';
import { signupData } from '../../../Api/Userapi';
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import signupic from '../../../Assests/Images/signupic.png'
import { RouteObjects } from '../../../Routes/RouteObject';

const Usersignup = () => {
  const navigate = useNavigate()
  const [user, setuser] = useState({
    userName: '',
    email: '',
    password: '',
    confirmpassword:''
    

  });

  const { userName, email, phone, password } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };


  const handleError = (err) => toast.error(err, { position: "top-left" });


  const validatePassword = (password) => {
    const minLength = 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);

    return (
      password.length >= minLength &&
      hasNumber &&
      hasLetter
    );
  };



  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      if(user.password != user.confirmpassword){
        toast.error("Passwords must match.");
      }
  
      if(!user.userName || !user.email || !user.password ){
        toast.error("Please enter all fields")
     } else if (!validatePassword(password)) {
      toast.error("Password: 6+ chars, letters & numbers.");
    } else{

      const userData = await signupData(user);
      if(userData.data.success===false){
        toast.error(userData.data.message)
      }else{
        toast.success(userData.data.message)
        setTimeout(() => {
          navigate(RouteObjects.Login)       
        }, 2000);
      }
      
   
     }

    } catch (err) {

    console.log(err);

    }



  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-pink-50">
        <div className='bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-auto 2xl:w-[60rem]  h-[35rem] flex justify-end items-center  rounded-md' >
          <img
            className="w-1/3 h-auto mr-20 rounded-l-md  object-cover" src={signupic} alt="signup image" />

          <div className="flex flex-col bg- [#ee8e8e] rounded-lg mt-3 shadow-lg dark:bg-gray-800 mr-11 lg:px-10">
            <div className="self-center mb-5 mt-5 text-xl font-semibold text-black-800 sm:text-2xl dark:text-white">
              Sign up
            </div>
            <span className="justify-center text-sm text-center gap-3 font-thin text-gray-800 flex items-center dark:text-gray-400">
              Already have an account ?
              <Link to="/login" className="text-sm  underline hover:text-blue-700">
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
                      className="rounded-lg border-pink-500 flex-1 mt-5 appearance-none border w-72 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      name="userName"
                      value={user.userName}
                      onChange={handleChange}
                      placeholder="Full name"
                    />
                  </div>
                </div>
                <div className="flex gap-4 mb-2">
                  <div className="relative">
                    <input
                      type="text"
                      id="create-account-first-name"
                      className="rounded-lg border-pink-500 mt-4 flex-1 appearance-none border w-72 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                      className="rounded-lg border-pink-500  mt-4 flex-1 appearance-none border w-72 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
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
                      className="rounded-lg border-pink-500  mt-4 flex-1 appearance-none border w-72  py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600focus:border-transparent"
                      name="confirmpassword"
                      value={user.confirmpassword}
                      onChange={handleChange}
                      placeholder="Confirmpassword"
                    />
                  </div>
                </div>

            


           
                <div className="flex w-full my-10">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#dc5151] hover:bg-pink-400  hover:scale-110 text-white w-[100%] transition ease-in duration-200 text-center text-base font-thin shadow-md focus:outline-none  rounded-lg"
                  >
                    Sign up
                  </button>
                </div>
              </form>
              <Toaster/>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usersignup;
