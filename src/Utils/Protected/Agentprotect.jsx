import React,{useEffect} from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { Checking } from "../../Api/Agentapi";
import { RouteObjects } from "../../Routes/RouteObject";
function Agentprotect(props) {
const navigate =useNavigate()
    const token = localStorage.getItem('AgentaccesToken')
    const decodedtoken = jwtDecode(token)
    console.log(decodedtoken);
    const agentid = decodedtoken.id

    useEffect(() => {
        const blockchecking = async () => {
            try {
                const response = await Checking(agentid);
                console.log(response,"oops!");
                if(response.data.success===false){
                    console.log("ok");
                    localStorage.removeItem('AgentaccesToken')
                    localStorage.removeItem('AgentrefreshToken')

                    navigate(RouteObjects.AgentLogin)
                }

            } catch (error) {
                console.log(error);
            }
        }
        blockchecking()
    }, [])



    if (localStorage.getItem("AgentaccesToken")) {
        return props.children;
    } else {
        return <Navigate to="/agent/" />;
    }

}

export default Agentprotect;



