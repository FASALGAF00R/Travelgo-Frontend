import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaInfoCircle, FaStripe, FaWallet } from 'react-icons/fa';
import { Elements } from '@stripe/react-stripe-js';
import { paymentRequest } from '../../Api/Userapi';
import { loadStripe } from '@stripe/stripe-js';
import Paymentstripe from './Paymentstripe';
import { useSelector } from 'react-redux';


let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
console.log(StripePromise, "pkkvfffffffff");




function Booking() {


  const selector = useSelector(state => state.user.userInfo)

  const location = useLocation()
  const packageId = location.state.packageId
  const packagee = location.state.package
  const numberOfPersons = location.state.numberOfPersons
  const totalAmount = location.state.totalAmount
  const startDate = location.state.startDate
  const endDate = location.state.endDate
  console.log(packageId, "packageIdfd");
  console.log(packagee.Destrictname, "packagee");
  const startDateFormatted = startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const endDateFormatted = endDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [clientSecret, setClientSecret] = useState("");
  const [amount, setamount] = useState()
  const [formData, setFormData] = useState({
    contact: '',
    address: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    if (packageId) {
      const fetchPaymentIntent = async () => {
        try {
          const res = await paymentRequest(packageId);
          console.log(res, "Response in payment requestttt");
          setClientSecret(res.data.clientSecret);
          setamount(totalAmount)
        } catch (error) {
          console.error("Error while making the request:", error);
        }
      };
      fetchPaymentIntent();
    }
  }, [packageId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmitaddres = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };






  const options = {
    clientSecret,
    // appearance,
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error(error);
    }
  };







  return (

    <>
      <h3 className='text-xl mb-4 mt-4 text-gray-700  font-bold p-1 text-center'>Booking <span className="text-gray-700 font-bold">Details</span></h3>
      <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col lg:flex-row w-[70%] rounded-2xl shadow-xl shadow-gray-800'>
          <div className='flex flex-col  w-full lg:w-full p-8'>
            <div className='mb-4'>
              <p className='text-gray-900 font-medium mb-2'>Username: {selector.username}</p>
              <p className='text-gray-900 font-medium'>Email: {selector.email}</p>
            </div>
            <h3 className='text-xl mb-4 text-white rounded-sm font-medium bg-gray-700 p-1 text-center '>Address details</h3>

            <form  onClick={handleSubmitaddres}>
              <div className='mb-4'>
                <label>Contact</label>
                <input
                  type='text'
                  name='contact'
                  placeholder='Contact'
                  className='border p-2 w-full'
                />
              </div>
              <div className='mb-4'>
                <label>Address</label>
                <input
                  type='text'
                  name='address'
                  placeholder='Address'
                  className='border p-2 w-full'
                />
              </div>
              <div className='mb-4'>
                <label>City</label>
                <input
                  type='text'
                  name='city'
                  placeholder='City'
                  className='border p-2 w-full'
                />
              </div>
              <div className='mb-4'>
                <label>State</label>
                <input
                  type='text'
                  name='state'
                  placeholder='State'
                  className='border p-2 w-full'
                />
              </div>
              <div className='mb-4'>
                <label>Country</label>
                <input
                  type='text'
                  name='country'
                  placeholder='Country'
                  className='border p-2 w-full'
                />
              </div>

              <h3 className='text-xl mb-auto text-gray-900  font-semibold '>Payment Type</h3>
            </form>
          </div>
          <div className='w-full lg:w-auto p-8 mt-8'>
            <div className='mb-7'>
              <div className='flex flex-row justify-between'>
                <h1 className='text-3xl font-semibold mb-2 text-gray-900 '>PackageDetails</h1>
              </div>
              <ul className='list-disc pl-3 space-y-4'>
                <li className=' text-gray-900 font-mono'>Destrict: <span className='text-black font-semibold'>{packagee.Destrictname}</span></li>
                <li className=' text-gray-900 font-mono'>activites: <span className='text-black font-semibold'>{packagee.activites && packagee.activites.map((el, index) => (
                  <div key={index}>
                    <p>
                      &bull; {el}
                    </p>
                  </div>
                ))}</span></li>
                <li className='mb-2 text-gray-900 font-mono'>Day start: <span className='text-black font-semibold'>{startDateFormatted}</span></li>
                <li className='mb-2 text-gray-900 font-mono'>Day end: <span className='text-black font-semibold'>{endDateFormatted} </span></li>
                <li className='mb-2 text-gray-900 font-mono'>Persons : <span className='text-black font-semibold'>{numberOfPersons} </span></li>
                <li className='mb-2 text-gray-900 font-mono'>amount: <span className='text-black font-semibold'>₹ {totalAmount}</span></li>

              </ul>
            </div>
            {/* <div className='bg-gray-800 px-7 hover:scale-110 mt-5 text-center text-white rounded-md  hover:text-white'>  pay now</div> */}
            {clientSecret ? (
              <div onClick={handleSubmit}
                className=''
                style={{ cursor: 'pointer' }}
              >
                {/* <FaStripe className=" ml-[40%] text-white" style={{ width: '30px', height: '39px' }} /> */}
                <Elements stripe={StripePromise} options={options}>
                  <Paymentstripe clientSecret={clientSecret} amount={amount} />
                </Elements>
              </div>
            ) : ""}
          </div>
        </div>
      </div>



    </>


  )
}

export default Booking
