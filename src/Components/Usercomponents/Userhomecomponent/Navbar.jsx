import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


function NavList({ userName }) {
const navigate =useNavigate()

 const  handlelogout = () =>{
{
  localStorage.removeItem('token')
}
navigate('/login')
 }



  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {userName ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium"
        >
          {userName}
        </Typography>
  ):(
    <>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="/login" className="flex items-center hover:text-white text-white">
          login
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="/signup" className="flex items-center hover:text-white text-white">
          sign up
        </a>
      </Typography>
      </>
  )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a href="/destinations" className="flex items-center hover:text-white text-white">
          Destinations
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a 
        href="#" className="flex items-center hover:text-black text-white"
          onClick={handlelogout}
          >
          Log out
        </a>
      </Typography>
    </ul>
  );
}



function NavbarSimple() {
  const [openNav, setOpenNav] = useState(false);
  const [loggedin, setloggedin] = useState(false)
  const [userName, setuserName] = useState("")

  console.log(userName, "pppp");

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    const token = localStorage.getItem('token')
    console.log(token, "ttttttttttt");


    if (token) {
      try {

        const decodedtoken = jwtDecode(token)
        console.log(decodedtoken, "decoded");

        const user = decodedtoken.userName
        console.log(user, "user");

        setloggedin(true);
        setuserName(user);

      } catch (error) {
        console.log("error while decoding token", error);
      }

    } else {

      setloggedin(false);
      setuserName("");

    }


    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);







  return (
    <Navbar className="bg-[#ee8e8e] mx-auto max-w-full">
      <div className=" flex items-center justify-between text-white  font-semibold">
        {/* <Typography> */}


        Travel Go
        {/* </Typography> */}
        <div className="hidden lg:block">
        <NavList userName={userName} />
        </div>

          {/* {loggedin ? (
            <Typography variant="small" color="blue-gray" className="p-1 font-medium">

              {userName}
              
            </Typography>
          ) : (
            <NavList />
          )}
        </div> */}
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        {/* {loggedin ? (
          <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {userName}
          </ul>) : ( */}
          <NavList userName={userName} />
      </Collapse>
    </Navbar>
  );

}

export {
  NavbarSimple
}