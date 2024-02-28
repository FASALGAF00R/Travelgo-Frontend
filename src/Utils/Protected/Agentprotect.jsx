import React from "react";
import { Navigate } from 'react-router-dom'

function Agentprotect(props) {
    if (localStorage.getItem("accesToken")) {
        return props.children;
    } else {
        return <Navigate to="/agent/" />;
    }

    }

    export default Agentprotect;



