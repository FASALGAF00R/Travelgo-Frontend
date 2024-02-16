import React, { useState, useEffect } from 'react'
import { Profile } from '../../Api/Userapi';
import { jwtDecode } from 'jwt-decode';
import { resetPassword } from '../../Api/Userapi';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { getuser } from '../../Api/Userapi';

function Userprofile() {
  const navigate = useNavigate()
  const [image, setimage] = useState(null)


  const Axcesstoken = localStorage.getItem('accesToken')
  const decodedtoken = jwtDecode(Axcesstoken)
  const Userid = decodedtoken.id
  const user = decodedtoken.userName
  const email = decodedtoken.email
  console.log(Userid, "jjjjjj")


  useEffect(() => {
    const fetchuser = async () => {
      try {
        const response = await getuser(Userid)
        console.log(response, "mm");
        setimage(response.data.image)
      } catch (error) {
        console.log("error while fetching user", error);
      }
    }
    fetchuser()
  }, [Userid])


  // const axcesstoken = localStorage.getItem('newaccessToken')

  // const decodedaxcesstoken = jwtDecode(axcesstoken)
  // const user = decodedtoken.userName
  // const email = decodedtoken.email


  const [formData, setFormData] = useState({
    image: null,
    password: '',
    newPassword: '',
  })


  const handleImageChange = async (e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('profilepic', file);
      const Response = await Profile(formData)
      const Url = Response.data.imageUrl;
      setFormData({ ...formData, image: Url });
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


  console.log({ email, formData }, "llllll");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await resetPassword({ email, formData });
      console.log('uiuiuiuiu:', response);
      if (response.data.success === true) {
        toast.success("updated")
        navigate('/')
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error('Error resetting password:', error);
    }
  }



  return (

    <div className="bg-pink-50 h-screen  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        <span className="text-blue-600">User</span> <span className="text-pink-600">Profile</span>
      </h1>
      <div className="w-full md:w-[30%] bg-white shadow-md  shadow-pink-600 p-6 rounded-3xl">
        <div className="flex justify-center items-center">
        
            <img className="w-32 h-32 mt-10 overflow-hidden rounded-full" src={image} alt="Profile" />
     
            <label htmlFor="upload" className="cursor-pointer">
              <input
                type="file"
                id="upload"
                name="image"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="w-40 h-40 mt-10 overflow-hidden  bg-gray-200 flex justify-center items-center">
                <span className="text-blue-gray-900">Upload Image</span>
              </div>
            </label>
  
        </div>
        <h2 className="text-lg font-light  text-center mt-3">{user}</h2>
        <div className="pl-9 font-light flex-row flex gap-2 mt-2">
          <label htmlFor="">Email :</label>
          <h2 className="gap-3 mb-5">{email}</h2>
        </div>
        <span className='font-serif text-cyan-800'>Change password</span>
        <br />
        <form className="pl-2 font-semibold flex   flex-col mt-4" onSubmit={handleSubmit} >
          <label className='font-light' htmlFor="password">Current Password:</label>
          <input type="password" id="password" name="password" className="border border-gray-300 rounded-md px-3 py-2 mt-1" value={formData.password} onChange={handleChange} />
          <label className='font-light ' htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" className="border border-gray-300 rounded-md px-3 py-2 mt-1" value={formData.newPassword} onChange={handleChange} />
          <button type="submit" className="bg-[#dc5151] hover:bg-pink-400 text-white font-thin py-2 px-4 rounded-lg mt-4 self-center" >Change Password</button>
        </form>
      </div>
      <ToastContainer />
    </div>



  )
}

export default Userprofile
