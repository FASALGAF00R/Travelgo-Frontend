import { useEffect } from 'react'
import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { Verify } from '../../../Api/Agentapi'
import { RouteObjects } from '../../../Routes/RouteObject'

function Agentverify() {
    const {token} = useParams()
    console.log(token,"token");
const navigate =useNavigate()

useEffect(() => {
    const Verifyagent = async ()=>{
        try { 
       const Data = await Verify(token)
        if (Data.data.success) {
            setTimeout(() => {
              navigate(RouteObjects.Login)
            }, 3000);
          }
         } catch (error) {
            console.log(error)
        }
    }
    Verifyagent()
}, [token])


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Agent Verification</h2>
      <p className="text-gray-700 mb-4">
        Agent verification is in progress. This may take some time.
      </p>
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6 text-blue-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p className="text-blue-500">Agent verification success!</p>
      </div>
      <p className="text-gray-700 mt-4">
        You will be redirected to the agent login page shortly.
      </p>
    </div>
  </div>
);
}

export default Agentverify