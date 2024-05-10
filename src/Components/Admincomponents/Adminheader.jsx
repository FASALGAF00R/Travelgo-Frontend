import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouteObjects } from '../../Routes/RouteObject'
import { useSelector } from 'react-redux';


function Adminheader() {
    const agentselector = useSelector(state => state.agent.agentInfo)
    const agentname = agentselector.agentname;
    console.log(agentname,"agentname");


    let navigate = useNavigate()
    const location =useLocation()



    
    const handleLogout = () => {
        if(location.pathname.includes('/admin/')){
            localStorage.removeItem('AdminaccesToken')
            localStorage.removeItem('AdminrefreshToken')
            navigate(RouteObjects.AdminLogin)

        }else if(location.pathname.includes('/agent/')){
            localStorage.removeItem('AgentaccesToken')
            localStorage.removeItem('AgentrefreshToken')
            navigate(RouteObjects.AgentLogin)

    }
}


    return (
        <>
     

      
            <nav className="bg-blue-gray-800 h-16 ">
                <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8 ">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex ">
                            <span className="text-white text-xl font-bold">Travelgo   </span>


                        </div>
                        {/* <div className="block md:hidden">
                            <button className="text-white hover:text-gray-300 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </button>
                        </div> */}


                        <div className="flex justify-end gap-6 text-gray-300">{agentname} 
                            <button className=" bg-white px-2 hover:scale-110  hover:text-gray-600 rounded-md text-black" onClick={handleLogout}>      Log Out</button>
                        </div>
                    </div>
                </div>

            </nav>

          
        </>
    )
}

export default Adminheader
