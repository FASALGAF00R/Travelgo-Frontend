import React from 'react'
import { useState, useEffect } from 'react'
import { Blockagent } from '../../Api/Adminapi'
import { Loadagents } from '../../Api/Adminapi'
function Agents() {
    const [agents, setAgents] = useState([])


    useEffect(() => {
        Loadagents()
            .then((res) => {
                const response = res.data.Agent;
                console.log(response,"opopopo");
              const agents =response.filter((item)=>item.isActive==='approval')
              setAgents(agents)
            }).catch((err) => {
                console.log(err);
            })
        }, [])
        console.log(agents,"ooooooooooooo");

    const HandleClick = async (agentid) => {
        try {
            await Blockagent({ _id: agentid }).then((res) => {
                if (res.status === 200) {
                    setAgents((prevAgents) =>
                        prevAgents.map((agents) =>
                            agentid._id === agentid ? { ...agents, block: !agents.block } : agents
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
            <div className="flex justify-center font-extrabold">
                <span className='text-gray-800 '>Agent</span>
                <span >management</span>
            </div>
                <br/>
                <br/>


            <div className="flex justify-center">
                <table className=" border border-gray-300 font-thin   shadow-gray-800 shadow-md" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">No</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent, index) => (
                            <tr key={agent.id}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{agent.userName}</td>
                                <td className="border border-gray-300 px-4 py-2">{agent.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{agent.phone}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {!agent.block ? (
                                    <button onClick={() => HandleClick(agent._id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md"                                  
                                    >
                                        <span>Block</span>
                                    </button>
                                ) : (
                                    <button onClick={() => HandleClick(agent._id)}
                                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                                    >
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
