import React, { useEffect } from "react";
import error from "../../Assests/Images/404page.jpg";
import { useNavigate } from "react-router-dom";

function Error404() {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <>
            <div className="flex justify-center items-center w-screen h-screen overflow-hidden">
                <img className="w-[80%] h-[90%]" src={error} alt="Error" />
            </div>
        </>
    )
}

export default Error404
