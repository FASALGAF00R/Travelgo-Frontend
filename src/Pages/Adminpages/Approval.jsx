import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Agentapprovallisting } from '../../Api/Adminapi';
import { approveAgent } from '../../Api/Adminapi';

function Approval() {
    const [agents, setAgents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [agentsPerPage] = useState(5);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await Agentapprovallisting();
                const data = response.data.Agent;
                const filteredAgents = data.filter((value) => value.isActive === 'pending');
                setAgents(filteredAgents);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAgents();
    }, []);

    const handleApprove = async (agentId, option) => {
        try {
            const response = await approveAgent({ _id: agentId, option });
            if (response.data.status === true) {
                toast.success(response.data.message);
                const updatedAgents = agents.filter((agent) => agent._id !== agentId);
                setAgents(updatedAgents);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const indexOfLastAgent = currentPage * agentsPerPage;
    const indexOfFirstAgent = indexOfLastAgent - agentsPerPage;
    const currentAgents = agents.slice(indexOfFirstAgent, indexOfLastAgent);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="flex justify-center font-extrabold">
                <span className="text-gray-800 ">Admin</span>
                <span className="font-extrabold text-gray-600">approval</span>
            </div>

            <div className="flex justify-center mt-10 mx-40 ">
                {currentAgents.length > 0 ? (
                    <table className="border border-gray-300 overflow-hidden shadow-gray-800 shadow-md" style={{ height: '200px', width: '100%' }}>
                        <thead className="bg-blue-gray-800 text-white">
                            <tr className="bg-blue-gray-800 border-b">
                                <th className="py-2 px-4 border-r">Number</th>
                                <th className="py-2 px-4 border-r">Agent Name</th>
                                <th className="py-2 px-4 border-r">Email</th>
                                <th className="py-2 px-4 border-r">Phone</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAgents.map((agent, index) => (
                                <tr key={agent.id} className="border-b">
                                    <td className="py-2 px-4 border-r">{index + 1}</td>
                                    <td className="py-2 px-4 border-r">{agent.userName}</td>
                                    <td className="py-2 px-4 border-r">{agent.email}</td>
                                    <td className="py-2 px-4 border-r">{agent.phone}</td>
                                    <td className="py-2 px-4">
                                        <button onClick={() => handleApprove(agent._id, 'Accepted')} className="bg-green-700 text-white px-3 py-1 rounded mr-2">
                                            <span>Accept</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-red-700">No agents available for approval!</p>
                )}
            </div>

            <div className="flex justify-center mt-80">
                <ul className="flex">
                    {[...Array(Math.ceil(agents.length / agentsPerPage))].map((_, index) => (
                        <li key={index}>
                            <button onClick={() => paginate(index + 1)} className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <Toaster />
        </>
    );
}

export default Approval;
