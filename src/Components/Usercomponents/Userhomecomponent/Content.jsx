import React from 'react';
import Trippana from '../../../Assests/Images/Trippana.png';
import { Link } from 'react-router-dom';

function Content() {

  return (
    <>

      <div className="bg-pink-50 min-h-screen  py-8 ">
        <div className="w-full h-screen   flex justify-center items-center p-7 overflow-hidden ">
          <div className="bg-gradient-to-r mt-10  from-[#8ec4d6] to-[#ee8e8e] w-full sm:max-w-[80%] h-full overflow-auto rounded-md flex flex-col lg:flex-row justify-center items-center p-5 lg:p-0 gap-5">

            <div className="lg:w-1/2 hidden lg:flex flex-col justify-center items-center text-center relative">
              <img
                src={Trippana}
                alt="homepage image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />        </div>


            <div className="lg:w-1/2 w-full flex flex-col justify-around items-center p-5 md:p-10 mb-4">
              <div className="w-full flex flex-col items-start">
                <span className="text-5xl font-semibold text-white mb-4">Travel Booking</span>
              </div>

              <div className="w-full flex flex-col gap-5 px-5 lg:px-0 items-center">
                <span className="text-md font-bold text-white   text-2xl">Hi Rovers</span>
                <span className=" text-white font-bold lowercase  text-md">"Book your next vacation with us today and experience the difference! We offer the best prices and the best selection of travel options, so you can find the perfect trip for your needs"</span>
              </div>

              <div className="flex justify-center items-center w-full">
                <Link to="/destinations" className="bg-gray-800  text-white  px-3 py-2 my-8 rounded-md mx-10  hover:bg-gray-700  animate-bounce ">
                  Explore Now
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
