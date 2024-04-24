import React, {useEffect}from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { RouteObjects } from "../../Routes/RouteObject";
import { UserChecking } from '../../Api/Userapi';

function Userprotected(props) {

    console.log("userroutesprotected");

    const navigate =useNavigate()
    const token = localStorage.getItem('accesToken')
    const decodedtoken = jwtDecode(token)
    console.log(decodedtoken,"jj");
    const userid = decodedtoken.id


    useEffect(() => {
        const Userblockchecking = async () => {
            try {
                console.log("hi bro");
                const response = await UserChecking(userid);
                console.log(response,"ovvops!");
                if(response.data.success===false){
                    localStorage.removeItem('accesToken')
                    navigate(RouteObjects. Userlogin)
                }

            } catch (error) {
                console.log(error);
            }
        }
        Userblockchecking()
    }, [])



    if (localStorage.getItem('accesToken')) {
        return props.children
    } else {

        return <Navigate to='/' />
    }

}

export default Userprotected
