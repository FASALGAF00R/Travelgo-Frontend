import { useEffect } from 'react'
import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
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
          alert('agent verification success')
            setTimeout(() => {
              navigate('/agent/login')
            }, 2000);
          }
         } catch (error) {
            console.log(error)
        }
    }
    Verifyagent()
}, [token])


  return (
    <div>Agent is verifying  may take some time ........

  </div>
  )
}

export default Agentverify