import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserVerify } from '../../../Api/Userapi';
import { ToastContainer, toast } from "react-toastify";

function Verification() {
  const { token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyUser = async () => {
      try { 
        const result = await UserVerify(token)
        if (result.status == 200) {
          toast.success('User verification success');
          setTimeout(() => {
            navigate('/login')
          }, 4000);
        }
      } catch (error) {
        console.log(error);
      }
    }
    verifyUser();
  }, [token]);




  return (


    <div>Verification
    <ToastContainer/>
    </div>
  )
}

export default Verification