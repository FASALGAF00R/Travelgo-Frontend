import React from 'react';
import { useState,useEffect } from 'react';
import { Agentapprovallisting } from '../../Api/Adminapi';
import { approveAgent } from '../../Api/Adminapi';

function Approval() {
    const [agent, setagent] = useState([])

    useEffect (() => {
        const fetchagents = async () => {
            try {
                const response = await Agentapprovallisting();
                setagent(response.data.Agent)
             
            } catch (error) {
                console.log(error);
            }
        }
        fetchagents()
    }, [])


    const handleaprove = async (agentId) => {
        try {
           
            await approveAgent({_id:agentId}).then((response)=>{
                if(response.status === 200){
                    alert(response.data. alert)
                    setagent((prevAgent)=>
                    prevAgent.map((agent)=>
                    agent._id === agentId ? {...agent,reject : !agent.reject}:agent
                    )
                    )
                }
            })

        } catch (error) {
            console.log(error);
        }
    }

    return (
      <div className="flex  justify-center mt-40 mx-40 ">
      <table className=" border border-gray-300 rounded-md overflow-hidden shadow-gray-800 shadow-md" style={{ height: '200px', width: '100p%' }}>
      <thead className='bg-blue-gray-800 text-white'>
                    <tr className="bg-blue-gray-800 border-b">
                        <th className="py-2 px-4 border-r">Number</th>
                        <th className="py-2 px-4 border-r">Agent Name</th>
                        <th className="py-2 px-4 border-r">Email</th>
                        <th className="py-2 px-4 border-r">Phone</th>
                        <th className="py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {agent.map((agents, index) => (
                        <tr key={agents.id} className="border-b">
                            <td className="py-2 px-4 border-r">{index + 1}</td>
                            <td className="py-2 px-4 border-r">{agents.userName}</td>
                            <td className="py-2 px-4 border-r">{agents.email}</td>
                            <td className="py-2 px-4 border-r">{agents.phone}</td>
                            <td className="py-2 px-4">
                            {/* {!agents.reject ? (
                                <button
                                    onClick={() => handleaprove(agents._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    <span>reject</span>
                                </button>
                                ):(
                                <button
                                    onClick={() => handleaprove(agents._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                >
                                    <span>approve</span>
                                </button>
                                )} */}

                                  <button
                                    onClick={() => handleaprove(agents._id)}
                                    className={`${agents.reject?"bg-red-500":"bg-green-500"}  text-white px-3 py-1 rounded mr-2`}
                                  >
                                    <span>{`${agents.reject?"Reject":"Accept"}`}</span>
                                  </button>
                                

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
     
        
    );
}

export default Approval;
