import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MdModeOfTravel } from "react-icons/md";



import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { jwtDecode } from "jwt-decode";
import { RouteObjects } from "../../../Routes/RouteObject";


// small thing
function NavList({ userName }) {
  const navigate = useNavigate()

  const handlelogout = () => {

    localStorage.removeItem('accesToken')

    navigate(RouteObjects.Userlogin)
  }



  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      {userName ? (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-bold cursor-pointer"
          onClick={() => navigate('/profile')}

        >
          {userName}
        </Typography>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-bold"
          >
            <a href="/login" className="flex items-center text-gray">
              login
            </a>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-bold"
          >
            <a href="/signup" className="flex items-center  text-gray">
              sign up
            </a>
          </Typography>
        </>
      )}
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/destinations" className="flex items-center text-gray">
          Destinations
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/userbookings" className="flex items-center hover:text-green-800 text-gray">
          Bookings
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a href="/about" className="flex items-center text-gray">
          About
          {/* <span className="tooltip-text">About Page</span> */}
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold"
      >
        <a
          href="#" className="flex items-center hover:text-red-600text-gray"
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



  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    const token = localStorage.getItem('accesToken')

    if (token) {
      try {

        const decodedtoken = jwtDecode(token)
        const user = decodedtoken.userName


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
    <Navbar className="bg-[#d67777] mx-auto max-w-full rounded-none py-5">
      <div className=" flex items-center justify-between   text-2xl font-semibold">
        <div className="flex justify-start gap-4 text-3xl text-gray-800 ">
          Travel go
          <MdModeOfTravel className="text-4xl " />
        </div>
        <div className="hidden lg:block text-gray-900">
          <NavList userName={userName} />
        </div>

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
        <NavList userName={userName} />
      </Collapse>
    </Navbar>
  );

}

export {
  NavbarSimple
}