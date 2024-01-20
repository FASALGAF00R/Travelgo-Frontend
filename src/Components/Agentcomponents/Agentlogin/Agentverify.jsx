import { useEffect } from 'react'
import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { Verify } from '../../../Api/Agentapi'

function Agentverify() {
    const {token} = useParams()
    console.log(token,"token");
const navigate =useNavigate()

useEffect(() => {
    const Verifyagent = async ()=>{
        try { 
       const Data = await Verify(token)
        if (Data.data.success) {
          alert('User verification success')
            setTimeout(() => {
              navigate('/login',{ state :'agent'})
            }, 2000);
          }else{
          alert('User verification not succes')
          }
         } catch (error) {
            console.log(error)
        }
    }
    Verifyagent()
}, [token])


  return (
    <div>Agent is verifying  may take some time ........
< ToastContainer/>
  </div>
  )
}

export default Agentverify