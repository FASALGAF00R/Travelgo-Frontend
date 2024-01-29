import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, } from 'react';
import { Admindata } from '../../../Api/Adminapi';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
 

function Login() {
  const navigate =useNavigate()
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
      const res = await Admindata(admin)
      if(res.data.status){
setTimeout(() => {
  navigate('/admin/home')
}, 2000);
      }


    } catch (error) {
      console.log(error);
      console.log("got errro");
    }


  }

  return (
    <>
      <div className=' flex justify-center  align-middle  my-16'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
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
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Sign Up
            </Button>

          </form>

        </Card>
      </div>
    </>
  );
}

export default Login
