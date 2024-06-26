import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchdata, fetchreview } from '../../Api/Userapi';
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
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { RouteObjects } from '../../Routes/RouteObject';
import { useSelector } from 'react-redux';


function Packagesdetail() {

  const selector = useSelector(state => state.agent.agentInfo)
  console.log(selector, "agentInfo");

  const navigate = useNavigate()

  const location = useLocation()
  const packageId = location.state
  const [pack, Setpack] = useState([])
  const [image, Setimages] = useState([])
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [review, Setreview] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchdata(packageId);
        const images = response.data.placespackage.Image;
        Setimages(images);
        Setpack(response.data.placespackage);
        const reviewData = await fetchreview(packageId);
        Setreview(reviewData.data.Reviewdetails);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchData();
  }, []);




  const perperson = pack.amount


  useEffect(() => {
    calculateTotalAmount();
  }, [startDate, endDate, numberOfPersons, review]);



  console.log(review, "review");

  const calculateTotalAmount = () => {
    const pricePerPerson = perperson;
    const pricePerDay = pack.perDAy;
    const days = endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
    const totalPrice = (pricePerPerson * numberOfPersons) + (pricePerDay * days);
    setTotalAmount(totalPrice);
  };


  const handleStartDate = (e) => {
    const selectedDate = new Date(e);
    setStartDate(selectedDate);
  };

  const handleEndDate = (e) => {
    const selectedDate = new Date(e);
    setEndDate(selectedDate);
  };


  const incrementCount = () => {
    setNumberOfPersons(prevCount => prevCount + 1);
  };

  const decrementCount = () => {
    if (numberOfPersons > 1) {
      setNumberOfPersons(prevCount => prevCount - 1);
    }
  };




  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (startDate === null || endDate === null) {
      toast.error('Please select both start and end dates');
      return;
    }
    navigate('/booking', {
      state: {
        package: pack,
        packageId: packageId,
        numberOfPersons: numberOfPersons,
        startDate: startDate,
        endDate: endDate,
        totalAmount: totalAmount
      }
    });
  }






  return (
    <>

      <Toaster />

      <h3 className='absolute font-bold text-black py-7 w-[95%] text-4xl text-center'>
        <span className='text-gray-800'>THE</span> JOURNEY<span className='text-gray-800'> BEG</span>INES
      </h3>

      <div className='flex flex-col lg:flex-row w-full py-5'>
        {image.length > 0 && (
          <img
            className='object-cover object-center w-full lg:w-2/3 h-64 md:h-96 lg:h-auto rounded-xl mt-0 md:mt-24 lg:mt-24 md:ml-0 lg:ml-14'
            src={image[0]}
            alt='nature image'
          />
        )}

        <div className='flex flex-col justify-between lg:w-1/3 mt-5 md:mt-0 lg:mt-0 lg:ml-4'>
          {image.slice(1).map((imageUrl, index) => (
            <img
              key={index}
              className="object-cover object-center w-full md:w-3/5 h-64 md:h-96 lg:h-[60%] rounded-xl mt-4 md:mt-24 lg:mt-24 md:ml-10 lg:ml-14"
              src={imageUrl}
              alt={`nature image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <h1 className='text-3xl  font-semibold py-8 text-center'>
        <span className='text-gray-800'>Package </span> <span className='text-black'>details</span>
      </h1>

      <div className='py-2 gap-11 flex flex-col lg:flex-row justify-center items-center px-5 md:px-20  '>
        <div className='w-full lg:w-[50%] mt-5 bg-white shadow-md p-6 rounded-3xl shadow-gray-800'>
          <h2 className='text-2xl font-semibold mb-2 text-gray-800  '>Tour Package Details</h2>
          <p className='text-gray-800 overflow-hidden overflow-ellipsis'>{pack.details}</p>
          <h2 className='text-2xl font-semibold mb-2 mt-4 text-gray-800'>Activities</h2>
          <ul className='list-disc list-inside text-gray-800'>
            {pack.activites && pack.activites.map((el, index) => (
              <li key={index} className="mb-2">
                <span className="mr-2">                                                                                                                                                                                         </span>
                <span className="overflow-hidden overflow-ellipsis">{el}</span>
              </li>
            ))}
          </ul>
          <h2 className='text-2xl font-semibold mb-2 mt-4 text-gray-800'>Category</h2>
          <p className='text-gray-800'>{pack.category}</p>
          <h2 className='text-2xl font-semibold mb-2 mt-4 text-gray-800'>Amount</h2>
          <p className='text-gray-800'>₹ {pack.amount}</p>
        </div>



        <div className='w-full lg:w-[50%] mt-5 bg-white shadow-md p-6 rounded-3xl shadow-gray-800'>
          <div class="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-gray-800">Travel Agent : {selector.agentname}</h2>
            <p class="text-gray-800 font-bold">contact : {selector.phone}</p>
            {/* <h2 class="text-xl font-semibold text-gray-800">chat </h2> */}

          </div>
          <div class="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold text-gray-800">Amount per day: <span class="text-blue-600">₹ {pack.perDAy} </span></h2>
            <p class="text-gray-800 font-bold">Per Person: ₹ {pack.amount}</p>

          </div>

          <form onSubmit={handleDetailsSubmit} >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 mb-4'>
              <div className='bg-white mt-1 hover:bg-gray-500 outline-none p-3 rounded-md '>
                <DatePicker placeholderText='Start day'
                  onChange={handleStartDate}
                  selected={startDate}
                  minDate={new Date()}
                />

              </div>
              <div className='bg-white mt-1 hover:bg-gray-500 outline-none p-3 rounded-md'>
                <DatePicker placeholderText='End day'
                  onChange={handleEndDate}
                  selected={endDate}
                  minDate={startDate || new Date()}

                />
              </div>
            </div>


            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
              <div className='bg-white hover:bg-gray-500 rounded-md shadow-sm '>
                <div className='m-3'>
                  <span className='text-gray-900 flex justify-center'>No. of persons</span>
                  <p className='mt-1 px-28'>{numberOfPersons}  </p>
                </div>
              </div>


              <div className='grid grid-cols-2 gap-4 mb-4'>
                <div className='flex items-center justify-center rounded-md bg-white'>
                  <button onClick={decrementCount} type='button' className='text-white hover:scale-x-110 bg-gray-800 px-4 py-2 rounded hover:bg-gray-900'>
                    -
                  </button>
                  <span className='m-5'></span>
                  <button onClick={incrementCount} type='button' className='text-white hover:scale-x-110 bg-gray-800 px-4 py-2 rounded hover:bg-gray-900'>
                    +
                  </button>
                </div>
              </div>
            </div>
            <h5 className='text-2xl mt-7  font-semibold leading-6 tracking-tight text-[#1e1e1e]'>Total Amount: ₹ {totalAmount ? totalAmount : pack.amount}</h5>

            <div className='flex justify-center py-2 gap-2 mt-5'>
              <Button type='submit' className='w-[30%] bg-gray-800 hover:bg-[#231e1ef8] hover:scale-105 leading-9' >
                Book Now
              </Button>
            </div>
          </form>
        </div>
      </div>
<div className="p-7">
  <div className="shadow-lg py-10 mt-10 rounded-lg shadow-gray-800">
    <div className="container mx-auto px-4">
      {review && review.length > 0 ? (
        <>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Customer Reviews & Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {review.map((el, index) => (
              <div key={index} className="bg-gray-300 rounded-lg p-6 mt-5 shadow-md">
                <div className="ml-2 text-gray-900 font-semibold  mb-1">User: {el.userName}</div>
                <span className="ml-2 text-gray-900 font-semibold  mb-6">Date: {new Date(el.date).toLocaleDateString()}</span>
                <div>
                  <p className="text-gray-800 mb-3 overflow-hidden overflow-ellipsis max-h-24" style={{ wordWrap: 'break-word' }}>{el.content}</p>
                </div>
                <div className="flex items-center">
                      <div className="flex justify-center mt-6">
                        <Rating value={el.rating}  readOnly={true} />
                        <span className="ml-2">{el.rating} / 5</span>
                      </div>
                    </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <span className="flex justify-center text-red-30000 font-bold text-3xl">No reveiws & ratings yet!</span>
      )}
    </div>
  </div>
</div>


      <div className="mb-20 "></div>

    </>

  )
}

export default Packagesdetail

