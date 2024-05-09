import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Successpage() {
    const location = useLocation();
    const { address, agentid, city, packageId, paymentDate, phone, state, totalAmount, userid } = location.state;

    const navigate = useNavigate();

    const downloadInvoice = () => {
        // Generate invoice content based on the data
        const invoiceContent = `
            <h1>Invoice</h1>
            <p>Company Name: Your Company Name</p>
            <p>Phone: ${phone}</p>
            <p>Address: ${address}, ${city}, ${state}</p>
            <p>Details:</p>
            <ul>
                <li>Package ID: ${packageId}</li>
                <li>Total Amount: ${totalAmount}</li>
                <li>Payment Date: ${paymentDate}</li>
                <!-- Add more details as needed -->
            </ul>
        `;
        
        // Create a new Blob containing the HTML content
        const blob = new Blob([invoiceContent], { type: 'text/html' });

        // Create a URL to the Blob
        const url = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = url;
        link.download = 'invoice.html'; // Set the filename for download

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the click event on the link
        link.click();

        // Cleanup
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    };

    const handleClick = () => {
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <>
            <div className="mt-20"></div>
            <div className="w-full h-screen flex items-center justify-center mt-12">
                <div className="">
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/payment-success-4320185-3598820.png" alt="" className="" />
                    <div className="text-center font-semibold ml-14 mb-10">
                        <h1 className="mb-6 font-semibold text-4xl text-gray-800">Success</h1>
                        <h1 className="font-sans text-xl">Your payment has been processed successfully</h1>
                        <h1 className="mt-4 font-thin text-md text-gray-900">Page while be automatically redirected to the main page or click button below</h1>
                        <div className="flex flex-row justify-center items-center gap-14">
                            <div className="mt-12">
                                <Link to="/userbookings" className="border-2 border-gray-600 p-2 rounded-md text-gray-600 hover:bg-cyan-700 hover:text-white">Bookings</Link>
                            </div>
                            <div className="mt-12">
                                <button onClick={handleClick} className="border-2 border-gray-600 p-2  rounded-md text-gray-600 hover:bg-gray-800 hover:text-white">Back to home</button>
                            </div>
                            <div className="mt-12">
                                <button onClick={downloadInvoice} className="border-2 border-gray-600 p-2  rounded-md text-gray-600 hover:bg-yellow-800 hover:text-white">Download Invoice</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <div className="mb-20"></div>
        </>
    );
}

export default Successpage;
