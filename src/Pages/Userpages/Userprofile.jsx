import React, { useState, useEffect } from 'react'
import { Profile } from '../../Api/Userapi';
import { resetPassword } from '../../Api/Userapi';
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import { getuser, getaddress } from '../../Api/Userapi';
import { RouteObjects } from '../../Routes/RouteObject';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa'
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom'
import { IoWalletSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

function Userprofile() {

  const selector = useSelector(state => state.user.userInfo)
  console.log(selector,"selector");
  const userid = selector.id
  const email=selector.email

  const location = useLocation();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    image: null,
    password: '',
    newPassword: '',
  })
  const [image, setimage] = useState(null)
  const [wallet, Setwallet] = useState(0)
  const [address, setaddress] = useState('')



  // showing user profil image
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await getuser(userid)
        setimage(response.data.image)
        Setwallet(response.data.wallet)

        const address = await getaddress(userid)
        setaddress(address.data.Address)



      } catch (error) {
        console.log("error while fetching user", error);
      }
    }
    fetchuser()
  }, [userid,formData])

  console.log(address, "address");



  // image upload
  const handleImageChange = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('profilepic', file);
      formData.append('userId', userid);
      const Response = await Profile(formData)
      if (Response.status === 200) {
        window.location.reload();
      }

      // setFormData(Url);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  // for reseting the password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await resetPassword({ email, formData });
      console.log(response);
      if (response.data.success === true) {
        toast.success("password updated")
        setTimeout(() => {
          navigate(RouteObjects.UserProfile)

        }, 1000);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }


  const handlelogout = () => {

    localStorage.removeItem('accesToken')

    navigate(RouteObjects.Userlogin)
  }



  return (
    <>

      <div className=" h-full  flex flex-col  justify-center">
        <div class="mt-8 "></div>
        <h1 className="text-3xl font-semibold mb-8 text-center">
          <span className="text-blue-600">User</span> <span className="text-pink-600">Profile</span>
        </h1>
        <div className="flex flex-row    items-center justify-evenly  ">
          <div className="w-full  md:w-[30%] sm:w-[50%] bg-white shadow-md  shadow-gray-800 p-6 rounded-3xl">
            <div className="flex justify-center items-center">
              <label htmlFor="upload" className="cursor-pointer">
                <img className="w-100 h-100 mt-3 overflow-hidden  rounded-sm" src={image} alt="Profile" />
                <input
                  type="file"
                  id="upload"
                  name="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div className=" mt-10 overflow-hidden ml-4  bg-gray-200 flex justify-center items-center">
                  <span className="text-blue-gray-900"></span>
                </div>
              </label>

            </div>
            <h2 className="text-lg text-gray-800 font-bold text-center ">
              <FaUser />
              {selector.username}</h2>

            <div className="pl-9 font-light flex-row flex gap-2 mt-4">
              <label htmlFor="" className='text-gray-800 font-bold'>Email :</label>
              <h2 className="mb-30  text-gray-800 font-bold  ">{selector.email}</h2>
            </div>
            <br />
            <span className='font-serif text-blue-700 font-bold mt-3'>Change password</span>
            <form className="pl-2 font-semibold flex   flex-col mt-4" onSubmit={handleSubmit} >
              <label className='  text-gray-800 font-bold ' htmlFor="password" >Current Password:</label>
              <input type="password" id="password" name="password" className="border border-gray-300 rounded-md px-3 py-2 mt-1  bg-gray-300" value={formData.password} onChange={handleChange} />
              <label className=' text-gray-800 font-bold  ' htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" className="border border-gray-300 rounded-md px-3 py-2 mt-1 bg-gray-300" value={formData.newPassword} onChange={handleChange} />
              <button type="submit" className="bg-[#dc5151] hover:bg-pink-400 text-white font-thin py-2 px-4 rounded-lg mt-4 self-center" >Change Password</button>
            </form>
          </div>

          <div className="w-full h-[30rem] md:w-[40%] sm:w-[60%] bg-white shadow-md shadow-gray-800  rounded-3xl">
            <div className="w-[100%] h-[5vh] bg-gray-800 rounded-md mb-4">

            </div>
            <div className="flex justify-center items-center ">
              <IoWalletSharp />
              <h2 className="text-lg text-gray-800 font-bold text-center ml-2">
                Wallet Amount
              </h2>
            </div>
            <div className="flex flex-col items-center mt-4 ">
              <span className="text-xl text-gray-800 font-semibold mb-4">₹ {wallet}</span>
              {address && (
                <div className="text-gray-800 mb-4 flex flex-col gap-2">
                  <div className="flex justify-between ">
                    <span className="font-bold px-2">City:</span>
                    <span>{address.address.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold px-2">State:</span>
                    <span>{address.address.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold px-2">Phone:</span>
                    <span>{address.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold px-2">Country:</span>
                    <span>{address.address.country}</span>
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex items-center py-3">
                  <GrLinkNext />
                  <Link to={{ pathname: "/wallethistory", search: `?wallet=${wallet}` }} className="text-gray-900 underline hover:text-blue-700 ml-2">Check Wallet History</Link>
                </div>
                <div className="flex items-center">
                  <GrLinkNext />
                  <Link to='/userbookings' className="text-gray-900 underline hover:text-blue-700 ml-2">My bookings</Link>
                </div>
                <div className="flex items-center py-3">
                  <CiLogout />
                  <a
                    href="#" className="flex items-center hover:text-red-600 text-gray ml-2"
                    onClick={handlelogout}
                  >
                    Log out
                  </a>               
                   </div>
              </div>
            </div>

          </div>

        </div>
        <Toaster />
        <div class="mb-10 "></div>
      </div >




    </>
  )
}

export default Userprofile
