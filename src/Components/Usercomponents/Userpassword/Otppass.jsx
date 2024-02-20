import React, { useState } from 'react'
import { Otpdata } from '../../../Api/Userapi'
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import { RouteObjects } from '../../../Routes/RouteObject';
function Otppass() {
  const location = useLocation()
  const { email ,role} = location.state
  
  console.log(email,';;;;;;;;;;',location);

  const navigate = useNavigate()
  const [otp, setOtp] = useState('')

  const handlesubmit = async (e) => {
    try {
      e.preventDefault()
      if (otp === '') {
        toast.error('fields empty')
      }
      const Otp = await Otpdata(otp)
      if (Otp.data.success === true) {
        toast.success(Otp.data.message)
        setTimeout(() => {
          navigate(RouteObjects.ResetPassword, { state: { email,role } })        
        }, 2000);
      } else {
        toast.error(Otp.data.message)
      }
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div className=' w-full h-full flex items-center justify-center'>
      <div className='w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        <div className="flex flex-col justify-center space-y-5 max-w-md mx-auto mt-24">
          <form onSubmit={handlesubmit}>
            <div className="flex flex-col space-y-2 mb-5 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
              <p className="text-md mb-5 md:text-xl">
                Enter the OTP we just sent you.
              </p>
            </div>
            <div className="flex flex-col max-w-md space-y-5">
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal"
              />
              <button
                type="submit"
                className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-blue-600 bg-[#dc5151] hover:bg-pink-400 text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </div >
        <ToastContainer />
      </div>
    </div>

  )
}

export default Otppass
