import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, } from 'react';
import { Admindata } from '../../../Api/Adminapi';
import toast, { Toaster } from "react-hot-toast";
import { RouteObjects } from '../../../Routes/RouteObject';

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


function Login() {
  const navigate = useNavigate()
  const [admin, setadmin] = useState({
    email: "",
    password: ""
  })


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setadmin({
      ...admin,
      [name]: value,
    })

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (admin.email === "" && admin.password === "") {
        toast.error("fields empty")
      } else {
        const res = await Admindata(admin)
        if (res.data.success === false) {
          toast.error(res.data.message)
        } else {
          localStorage.setItem('AdminaccesToken', res.data.accesToken)
          localStorage.setItem('AdminrefreshToken', res.data.Refreshtoken)
          setTimeout(() => {
            navigate(RouteObjects.Adminhome,{state:{role:'admin'}})
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error);
    }


  }

  return (
    <>
    <div className='flex justify-center my-24 '>
      <div className=' flex justify-center    '>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
           Log in
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you admin! Enter your details to login.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-1 flex flex-col gap-6">


              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Your Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@email.com"
                name='email'
                value={admin.email}
                onChange={handleInputChange}

                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name='password'
                value={admin.password}
                onChange={handleInputChange}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

              />
            </div>
            <Button type="submit" className="mt-6 hover:scale-105 hover:px-2" fullWidth>
              Log in
            </Button>

          </form>
          <Toaster />

        </Card>
      </div>
      </div>
    </>
  );
}

export default Login
