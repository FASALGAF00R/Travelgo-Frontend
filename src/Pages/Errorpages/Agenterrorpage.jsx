import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import error from "../../Assests/Images/404page.jpg";

function Agenterrorpage() {


    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/agent");
        }, 3000);
        return () => clearTimeout(timer);
    }, [navigate]);



  return (
    <>
    
    
    <div className="flex justify-center mb-7 items-center w-screen h-screen overflow-hidden">
                <img className="w-[70%] h-[70%]" src={error} alt="Error" />
            </div>
    
    
    
    
    
    
    </>
  )
}

export default Agenterrorpage