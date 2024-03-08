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
                const agents = response.filter((item) => item.isActive === 'Accept')
                setAgents(agents)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const HandleClick = async (agentid) => {
        try {
            const res = await Blockagent({ _id: agentid })
            console.log(res, "ii");
            setAgents((prevAgent) =>
                prevAgent.map((agent) =>
                    agent._id === agentid ?
                        { ...agent, isBlock: !agent.isBlock } : agent
                )
            )


        } catch (error) {
            console.error('Error blocking user:', error);
        }
    }


    return (
        <>
            <div className="flex justify-center font-extrabold">
                <span className='text-gray-800 '>Agents</span>
                <span className='font-extrabold text-gray-600'>management</span>
            </div>
            <br />
            <br />


            <div className="flex justify-center">
                {agents.length > 0 ? (
                    <table className=" border border-gray-300 font-thin   shadow-gray-800 shadow-md" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
                            {agents.map((agent, index) => (
                                <tr key={agent.id}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{agent.userName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{agent.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{agent.phone}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {agent.isBlock ? (
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

                ):(
                    <p className='text-red-700'>No agents available !</p>
                )}

            </div>


        </>
    )
}

export default Agents
