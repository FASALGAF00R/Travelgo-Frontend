import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { Checking } from "../../Api/Agentapi";
import { RouteObjects } from "../../Routes/RouteObject";

function Agentprotect(props) {
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('AgentaccesToken');
        if (!token) {
            navigate(RouteObjects.AgentLogin);
            return;
        }

        const decodedToken = jwtDecode(token);
        const agentId = decodedToken.id;

        const blockChecking = async () => {
            try {
                const response = await Checking(agentId);
                console.log(response, ";;;;ttttttttt;");
                if (response.data.success === false) {
                    localStorage.removeItem('AgentaccesToken');
                    localStorage.removeItem('AgentrefreshToken');
                    navigate(RouteObjects.AgentLogin);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setChecked(true);
            }
        };

        blockChecking();
    }, [navigate]);

    if (!checked) {
        // You might want to return a loading indicator here
        return null;
    }

    if (localStorage.getItem("AgentaccesToken")) {
        return props.children;
    } else {
        return <Navigate to="/agent/" />;
    }
}

export default Agentprotect;
