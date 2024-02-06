import React from 'react'

function Otppass() {
  return (
    <div className="flex flex-col justify-center space-y-5 max-w-md mx-auto mt-24">
    <form >
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
        //   value={otp}
        //   onChange={(e) => setOtp(e.target.value)}
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
  </div>
  )
}

export default Otppass
