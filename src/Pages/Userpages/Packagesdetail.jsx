import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchdata } from '../../Api/Userapi';
import {
  Button,
  Rating,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";


function Packagesdetail() {

  const location = useLocation()
  const packageId = location.state

  const [pack, Setpack] = useState([])
  const [image, Setimages] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchdata(packageId).then((response) => {
        console.log(response, 'pppppppppp');
        const images = response.data.placespackage.Image
        Setimages(images)
        console.log(images, "images");
        Setpack(response.data.placespackage)

      })
        .catch((error) => {
          console.error('Error fetching packages:', error);
        });

    }
    fetch()
  }, [])




  return (
    <>
      <h1 className='bg-pink-50 text-center font-semibold text-4xl  '>Journey Begins</h1>
      <div className="bg-pink-50 flex flex-col lg:flex-row w-full mb-5">
        {image.length > 0 && (
          <img
            className="object-cover object-center w-96 sm:w-full lg:w-2/3 h-64 md:h-96 lg:h-full rounded-xl mt-[6rem] md:mt-24 lg:mt-24 md:ml-10 lg:ml-14"
            src={image[0]}
            alt="nature image"
          />
        )}

        <div className='flex flex-col justify-between'>
          {image.slice(1).map((imageUrl, index) => (
            <img
              key={index}
              className="object-cover object-center w-full md:w-3/5 h-64 md:h-96 lg:h-[40%] rounded-xl mt-4 md:mt-24 lg:mt-24 md:ml-10 lg:ml-14"
              src={imageUrl}
              alt={`nature image ${index + 1}`}
            />
          ))}
        </div>


      </div>



      <h1 className="text-3xl font-semibold  text-center">
        <span className="text-blue-600">Package </span> <span className="text-pink-600">details</span>
      </h1>

      <div className="bg-pink-50 h-full gap-9 flex flex-row mt-6 justify-start px-20">

        <div className="h-[500px] md:w-[50%] mt-5 sm:w-[60%] bg-white shadow-md shadow-pink-600 p-6 rounded-3xl">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Tour Package Details</h2>
              <p className="text-gray-600">{pack.details}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Activities</h2>
              <ul className="list-disc list-inside text-gray-600">
                {/* <li>Hiking</li>
                <li>Sightseeing</li>
                <li>Swimming</li> */}

                {pack.activites}
              </ul>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Category</h2>
              <p className="text-gray-600">{pack.category}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Amount</h2>
              <p className="text-gray-600">{pack.amount}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Other Information</h2>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, elit nec ullamcorper viverra, nisi elit gravida nunc.</p>
            </div>
          </div>
        </div>

        <div className="h-[500px] md:w-[50%] mt-5 sm:w-[60%] bg-white shadow-md shadow-pink-600 p-6 rounded-3xl">
          <div className="col-span-2 row-span-5 col-start-4">
            <form action="">
              <div className="h-[360px] bg-[#EDE3E3] px-5 py-5 shadow-lg rounded-md">
                <div className="flex gap-3 items-center mt-2 mb-8">
                  <h5 className="ont-san text-2xl font-normal leading-6 tracking-tight text-[#1e1e1e]">
                    ₹ Price
                  </h5>
                  <span className="font-normal text-lg leading-3 tracking-tighter text-[#959595]">
                    Per night 
                  </span>
                </div>

                <div className="grid grid-cols-2 w-full rounded-none gap-6">
                  <div className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm relative">
                    <div className="m-3">
                      <span className="text-gray-700">Start day</span>
                      <DatePicker
                        placeholderText="Start day"
                        className=" bg-white mt-1 hover:bg-gray-200 outline-none"
                        popperClassName="z-50"
                      />
                    </div>
                  </div>

                  <div className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm relative">
                    <div className="m-3">
                      <span className="text-gray-700">End day</span>
                      <DatePicker
                        placeholderText="End day"
                        className=" bg-white hover:bg-gray-200 mt-1 outline-none "
                        popperClassName="z-50"
                      />
                    </div>
                  </div>
                </div>



                <div className="grid grid-cols-2 w-full rounded-none  mt-5 gap-6">
                  <div className="w-full h-[80px] bg-white hover:bg-gray-200 rounded-md shadow-sm">
                    <div className="m-3">
                      <span className="text-gray-700">No. of Guests</span>
                      <p className="mt-1"> guests</p>
                    </div>
                  </div>
                  {/* <div className="w-full h-[80px] bg-white rounded-md hover:bg-gray-200 shadow-sm">
                    <div className="m-3">
                      <span className="text-gray-700">No. of Rooms</span>
                      <p className="mt-1"> rooms</p>
                    </div>
                  </div> */}
                </div>


                <div className="grid grid-cols-2 gap-5">
                  <div className="flex items-center justify-center rounded-md mt-3 bg-white">
                    <button
                      type="button"
                      className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-pink-300"
                    >
                      -
                    </button>
                    <span className="m-5"></span>


                    <button
                      type="button"
                      className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-pink-300"
                    > +
                    </button>
                  </div>
                </div>

                <h5 className="ont-san text-2xl mt-16 font-normal leading-6 tracking-tight text-[#1e1e1e]">
                  Total Amount : ₹
                </h5>
              </div>

              <div className="w-full mt-12">
                <Button type="submit" className="w-full bg-pink-300 hover:bg-[#e28585f8] leading-9" size="lg">
                  Book Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      
    </>

  )
}

export default Packagesdetail
