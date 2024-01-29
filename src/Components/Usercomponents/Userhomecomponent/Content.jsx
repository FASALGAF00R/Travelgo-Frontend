import React from 'react';
import Trippana from '../../../Assests/Images/Trippana.png';
import { Link } from 'react-router-dom';

function Content() {

  return (
    <div className="w-full h-screen  bg-pink-50 flex justify-center items-center p-7 overflow-hidden">
      <div className="bg-gradient-to-r from-[#8ec4d6] to-[#ee8e8e] w-full sm:max-w-[80%] h-full overflow-auto rounded-md flex flex-col lg:flex-row justify-center items-center shadow-xl p-5 lg:p-0 gap-5">
        {/* Left Section */}
        <div className="lg:w-1/2 hidden lg:flex flex-col justify-center items-center text-center relative">
          <img
            src={Trippana}
            alt="homepage image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-around items-center p-5 md:p-10">
          <div className="w-full flex flex-col items-start">
            <span className="text-5xl font-bold text-white">Travel Booking</span>
            <span className="text-4xl font-bold text-white">Tours</span>
          </div>

          <div className="w-full flex flex-col gap-5 px-5 lg:px-0 items-center">
            <span className="text-md font-extrabold text-white">Hi Rovers</span>
            <span className="text-sm text-white font-extrabold">YOUR IMAGINATION IS ONLY YOUR LIMIT</span>
          </div>

          <div className="flex justify-center items-center w-full">
            <Link to="/login"  className="  bg-pink-300 text-white py-2 px-2 my-10 rounded-md mx-10 text-sm hover:bg-pink-600">
           Explore Now
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
