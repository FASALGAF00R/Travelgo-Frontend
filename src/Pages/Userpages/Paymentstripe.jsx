import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FaStripe } from "react-icons/fa";
import { useNavigate,useLocation } from "react-router-dom";
import { Userbookingdata } from "../../Api/Userapi";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import toasti, { Toaster } from "react-hot-toast";



function Paymentstripe({ amount, packageId, agentid, userid, totalAmount, formData ,paymentDate}) {

    const location = useLocation()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const handleOpen = () => {

        if (!formData.contact &&
            !formData.address &&
            !formData.city &&
            !formData.state &&
            !formData.country 
            ) {
                toasti.error("Please enter all fields")
        } else if (!formData.contact) {
            toasti.error("Please enter your contact")
        } else if (!formData.address) {
            toasti.error("Please enter your address")
        } else if (!formData.city) {
            toasti.error("Please enter your city")
        } else if (!formData.state) {
            toasti.error("Please enter your state")
        } else if (!formData.country) {
            toasti.error("Please enter your country");
        
        } else {

        setOpen((cur) => !cur);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    }


    const handleSubmitaddres = async (e) => {
        e.preventDefault();
        try {
console.log(paymentDate,"paymentDate");
                const res = await Userbookingdata(formData, totalAmount, userid, agentid, packageId,paymentDate)
                if (res.data.status === true) {
                    toast.success("Booked Successfully")
                    setTimeout(() => {
                        navigate('/success',{state:{
                            phone:formData.contact,
                            address:formData.address,
                            city:formData.city,
                            state:formData.state,
                            paymentDate:paymentDate,
                            packageId:packageId,
                            userid:userid,
                            agentid:agentid,
                            totalAmount:totalAmount
                        }})
                    }, 3000);
                } else {
                    toast.error("Booking unSuccessfull")
                
            }
        } catch (error) {
            console.error(error);
        }
    };






    return (
        <>

            <Button onClick={handleOpen}>Pay Now</Button>
            {open && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
                        <div className="flex justify-between">
                            <div className="">
                                <h5 className="text-blue-gray text-xl font-semibold">
                                    Make Your Payment
                                </h5>
                                <p className="text-gray text-sm">
                                    Choose which card you want to connect
                                </p>
                            </div>

                            <button
                                className="text-blue-gray focus:outline-none  mt-2"
                                onClick={handleOpen}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-6 flex flex-row justify-around space-x-72">
                            <h1 className="flex">Rent</h1>
                            <span>₹ {amount}</span>
                        </div>
                        <div className="border-b-2 border-gray-400"></div>
                        <div className="mt-12">
                            <PaymentElement />
                        </div>
                        <div className="w-auto flex justify-center mt-5" >
                            <button onClick={handleSubmitaddres} className="bg-blue-500 w-44 text-white font-semibold rounded-md">PAY</button>
                        </div>
                        <div className="w-full flex justify-center mt-10 gap-2">
                            <FaStripe className="w-6 h-7" />
                            <h1>Payments are secure and encrypted</h1>
                        </div>
                    </div>
                    <ToastContainer />
                    <Toaster/>
                </div>
            )}
        </>
    )
}

export default Paymentstripe

