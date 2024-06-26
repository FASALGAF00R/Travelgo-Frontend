import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, } from 'react-router-dom';
import { FaInfoCircle, FaStripe, FaWallet } from 'react-icons/fa';
import { Elements } from '@stripe/react-stripe-js';
import { fetchuserdata, paymentRequest, walletPayment } from '../../Api/Userapi';
import { loadStripe } from '@stripe/stripe-js';
import Paymentstripe from './Paymentstripe';
import { useSelector } from 'react-redux';
import Successpage from './Successpage';
import toast, { Toaster } from "react-hot-toast";
import { format } from 'date-fns';

let StripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC);
console.log(StripePromise, "pff");


function Booking() {


  const selector = useSelector(state => state.user.userInfo)
  const agentselector = useSelector(state => state.agent.agentInfo)

  const agentid = agentselector.id
  const userid = selector.id
  const navigate = useNavigate()
  const location = useLocation()
  const packageId = location.state.packageId
  const packagee = location.state.package
  const numberOfPersons = location.state.numberOfPersons
  const totalAmount = location.state.totalAmount
  const startDate = location.state.startDate
  const endDate = location.state.endDate


  const startDateFormatted = startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const endDateFormatted = endDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const [success, setsuccesspage] = useState(false)
  const [paymentDate, setPaymentDate] = useState();
  const [walletOpen, setWalletOpen] = useState(false)
  const [Wallet, Setwallet] = useState('')
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setamount] = useState()
  const [formData, setFormData] = useState({
    contact: '',
    address: '',
    city: '',
    state: '',
    country: '',
    paymentDate: '',
  });


  useEffect(() => {
    if (packageId) {
      const fetchPaymentIntent = async () => {
        try {
          const res = await paymentRequest(packageId);
          console.log(res, "Response in payment requestttt");
          setClientSecret(res.data.clientSecret);
          setamount(totalAmount)

          const Res = await fetchuserdata(userid)
          Setwallet(Res.data.wallet)
        } catch (error) {
          console.error("Error while making the request:", error);
        }
      };
      fetchPaymentIntent();
    }
  }, [packageId]);


  useEffect(() => {
    const currentDate = new Date();
    const isoDate = format(currentDate, "yyyy-MM-dd");
    setPaymentDate(isoDate);
  }, []);


  console.log(paymentDate, "Wallet");

  const handleWallet = () => {
    setWalletOpen(!walletOpen)
  }



  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "paymentDate") {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const options = {
    clientSecret,
  };

  const handlePaymentWallet = async (contact, address, city, state, country, paymentDate) => {
    console.log(state, "workeddddddddd");
    try {
      if (!formData.contact &&
        !formData.address &&
        !formData.city &&
        !formData.state &&
        !formData.country
      ) {
        toast.error("Please enter all fields")
      } else if (!formData.contact) {
        toast.error("Please enter your contact")
      } else if (!formData.address) {
        toast.error("Please enter your address")
      } else if (!formData.city) {
        toast.error("Please enter your city")
      } else if (!formData.state) {
        toast.error("Please enter your state")
      } else if (!formData.country) {
        toast.error("Please enter your country");

      } else {

        const res = await walletPayment(contact, address, state, totalAmount, packageId, userid, agentid, country, city, paymentDate)
        if (res.data.success === true) {
          toast.success(res.data.message)
          setTimeout(() => {
            navigate('/success',{state:{    
              phone:contact,
              address:address,
              city:city,
              state:state,
              paymentDate:paymentDate,
              packageId:packageId,
              userid:userid,
              agentid:agentid,
              totalAmount:totalAmount
            }})
        }, 3000);
        } else {
          toast.error(res.data.message)

        }
      }


    } catch (error) {
      console.log(error);
    }
  }











  return (

    <>
      <div class="mt-14"></div>

      {success ? (<Successpage />) : (
        <>
          <h3 className='text-3xl mb-4 mt-4 text-gray-700  font-bold p-1 text-center'>Booking <span className="text-gray-700 font-bold">Details</span></h3>
          <div className='flex justify-center items-center h-screen '>
            <div className='flex flex-col lg:flex-row w-[70%] rounded-2xl shadow-xl shadow-gray-800'>
              <div className='flex flex-col  w-full lg:w-full p-8 '>
                <div className='mb-4'>
                  <p className='text-gray-900 font-medium mb-2'>Username: {selector.username}</p>
                  <p className='text-gray-900 font-medium'>Email: {selector.email}</p>
                </div>
                <h3 className='text-xl mb-4 text-white rounded-sm font-medium bg-gray-900 p-1 text-center animate-pulse '>Address details</h3>

                <form >
                  <div className='mb-4'>
                    <label>Contact</label>
                    <input
                      type='text'
                      name='contact'
                      placeholder='Contact'
                      onChange={handleChange}
                      value={formData.contact}
                      className='border p-2 w-full'
                    />
                  </div>
                  <div className='mb-4'>
                    <label>Address</label>
                    <input
                      type='text'
                      name='address'
                      placeholder='Address'
                      onChange={handleChange}
                      value={formData.address}
                      className='border p-2 w-full'
                    />
                  </div>
                  <div className='mb-4'>
                    <label>City</label>
                    <input
                      type='text'
                      name='city'
                      placeholder='City'
                      onChange={handleChange}
                      value={formData.city}
                      className='border p-2 w-full'
                    />
                  </div>
                  <div className='mb-4'>
                    <label>State</label>
                    <input
                      type='text'
                      name='state'
                      placeholder='State'
                      onChange={handleChange}
                      value={formData.state}
                      className='border p-2 w-full'
                    />
                  </div>
                  <div className='mb-4'>
                    <label>Country</label>
                    <input
                      type='text'
                      name='country'
                      placeholder='Country'
                      onChange={handleChange}
                      value={formData.country}
                      className='border p-2 w-full'
                    />
                  </div>

                  <div className='mb-4'>
                    <label>Payment Date</label>
                    <input
                      type='text'
                      name='paymentDate'
                      value={paymentDate}
                      readOnly={true}
                      className='border p-2 w-full'
                    />
                  </div>


                </form>
              </div>
              <div className='w-full lg:w-auto p-8 mt-8'>
                <div className='mb-7'>
                  <div className='flex flex-row justify-between'>
                    <h1 className='text-3xl font-semibold mb-2 text-gray-900 '>PackageDetails</h1>
                  </div>
                  <ul className='list-disc pl-3 space-y-4'>
                    <li className=' text-black font-mono'>Destrict: <span className='text-gray-900   font-semibold'>{packagee.Destrictname}</span></li>
                    <li className=' text-black font-mono'>activites: <span className='text-gray-900  font-semibold'>{packagee.activites && packagee.activites.map((el, index) => (
                      <div key={index}>
                        <p>
                          &bull; {el}
                        </p>
                      </div>
                    ))}</span></li>
                    <li className='mb-2 text-gray-900 font-mono'>Day start: <span className='text-gray-900 font-semibold'>{startDateFormatted}</span></li>
                    <li className='mb-2 text-gray-900 font-mono'>Day end: <span className='text-gray-900 font-semibold'>{endDateFormatted} </span></li>
                    <li className='mb-2 text-gray-900 font-mono'>Persons : <span className='text-gray-900 font-semibold'>{numberOfPersons} </span></li>
                    <li className='mb-2 text-gray-900 font-mono'>amount: <span className='text-gray-900 font-semibold'>₹ {totalAmount}</span></li>

                  </ul>
                </div>
                <div className='flex flex-row items-center mt-8 gap-2' onClick={handleWallet}>
                  <FaInfoCircle className='' />
                  <p className='font-bold text-cyan-800'>Pay through wallet</p>
                </div>
                {walletOpen ?
                  <div className='flex flex-row gap-4 mt-2'>
                    <h1 className='font-bold'>Your wallet: <span className='text-gray-800'>₹ {Wallet}</span></h1>
                    <button onClick={() => handlePaymentWallet(formData.contact, formData.address, formData.city, formData.state, formData.country, formData.paymentDate)} className='border-2 border-white rounded-lg p-1 hover:scale-110 shadow-md shadow-cyan-700  bg-gray-800 text-white'>Pay Now</button>
                  </div>
                  : ""}
                <div class="mb-9"></div>
                {clientSecret ? (
                  <div
                    className=''
                    style={{ cursor: 'pointer' }}
                  >
                    <Elements stripe={StripePromise} options={options}>
                      <Paymentstripe clientSecret={clientSecret} amount={amount} paymentDate={paymentDate} formData={formData} totalAmount={totalAmount} userid={userid} agentid={agentid} packageId={packageId} />
                    </Elements>
                  </div>
                ) : ""}
              </div>
            </div>
            <Toaster />
          </div>
          <div class="mb-32"></div>

        </>
      )}




    </>


  )
}

export default Booking
