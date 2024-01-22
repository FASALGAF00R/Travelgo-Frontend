import React from 'react'
import { useState,useEffect } from 'react'
import { Blockagent } from '../../Api/Adminapi'
import { Loadagents } from '../../Api/Adminapi'
function Agents() {
    const [agents,setAgents]=useState([])


useEffect(()=>{
    Loadagents()
    .then((res)=>{
        const response =res.data.Agent;
        setAgents(response)
    }).catch((err)=>{
        console.log(err);
    })
},[])

const HandleClick =async (agentid)=>{
    try {
        console.log("oooooooooo");
   await Blockagent({_id:agentid}).then((res)=>{
    if (res.status === 200) {
        setAgents((prevAgents)=>
      prevAgents.map((agents)=>
      agentid._id === agentid ? {...agents ,block :!agents.block}:agents
      )
      )
   }
  });

} catch (error) {
    console.error('Error blocking user:', error);
  }

}



  return (
    <>
    <div className="overflow-x-auto">
   <table className="min-w-full border border-gray-300">
     <thead>
       <tr>
         <th className="border border-gray-300 px-4 py-2">#</th>
         <th className="border border-gray-300 px-4 py-2">Name</th>
         <th className="border border-gray-300 px-4 py-2">Email</th>
         <th className="border border-gray-300 px-4 py-2">Action</th>
       </tr>
     </thead>
     <tbody>
         {agents.map((agent,index)=>(
 
       <tr key={agent.id}>
         <td className="border border-gray-300 px-4 py-2">{index +1}</td>
         <td className="border border-gray-300 px-4 py-2">{agent.userName}</td>
         <td className="border border-gray-300 px-4 py-2">{agent.email}</td>
         <td className="border border-gray-300 px-4 py-2">{agent.phone}</td>
         <td className="border border-gray-300 px-4 py-2">{!agent.block ?(
       <button onClick={()=>HandleClick(agent._id)}> 
       <span>Block</span>
       </button>
         ):(
           <button onClick={()=>HandleClick(agent._id)}> 
           <span>UnBlock</span>
           </button>
         )}
       </td>
       </tr>
               ))}
 
     </tbody>
   </table>
 </div>
 
    
    </>
  )
}

export default Agents
