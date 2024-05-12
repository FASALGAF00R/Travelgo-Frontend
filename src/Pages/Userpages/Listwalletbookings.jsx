import React, { useEffect, useState } from 'react';
import { CancelBookPayment, fetchBookings } from '../../Api/Userapi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function Listwalletbookings() {
    const location = useLocation();
    console.log(location, "ggggggggg");
    const searchParams = new URLSearchParams(location.search);
    const walletAmount = parseFloat(searchParams.get('wallet'));
    console.log(walletAmount, "'wallet");

    const selector = useSelector(state => state.user.userInfo)
    const username = selector.username
    const userid = selector.id

    const [open, setOpen] = useState(false);
    const [Walletbookings, SetWalletbookings] = useState([])
    const currentDate = new Date().toLocaleDateString();



    const handleOpen = () => setOpen(!open);







// for wallet
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const Res = await fetchBookings(userid)
                console.log(Res, "Res");
                SetWalletbookings(Res.data.bookings)
            } catch (error) {
                console.error('Error fetching bookings:', error)
            }
        }
        fetchdata()
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = Walletbookings.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const calculateDebitedAmount = booking => {
        return walletAmount - parseFloat(booking.Amount);
    };

    return (
        <>
            <div class="mt-9"></div>
            {Walletbookings.length > 0 ? (
                <div className="container mx-auto px-8 py-4">
                    <h2 className="text-3xl font-bold mb-2 animate-bounce text-green-600">Wallet Bookings</h2>
                    <div className="flex justify-end text-lg font-bold mb-2">Current Wallet Amount:</div>
                    <div className="flex justify-end text-xl font-bold text-green-600 mb-4">₹ {walletAmount}</div>
                    <table className="w-full rounded-xl shadow-md ">
                        <thead>
                            <tr className='bg-gray-500'>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">No</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Username</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Date</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Payment Type</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Mobile</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Wallet Amount</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Status</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Details</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Debited Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking, index) => (
                                <tr key={index} className="transition duration-500 ease-in-out transform hover:bg-gray-100">
                                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{username}</td>
                                    <td className="border border-gray-200 px-4 py-2">{currentDate}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.payment_type}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                                    <td className="border border-gray-200 px-4 py-2">₹ {walletAmount}</td>
                                    {booking.isCanceled === true ? (
                                        <td className="border border-gray-200 px-8 py-4 text-red-500 font-bold  rounded p-4">failed</td>

                                    ) : (

                                        <td className="border border-gray-200 px-4 py-2 font-bold text-green-500">{booking.bookingStatus}</td>
                                    )}

                                    <td className="border border-gray-200 px-4 py-2">
                                        <Button onClick={handleOpen} variant="gradient">
                                            Details
                                        </Button>
                                    </td>
                                    <td className="border border-gray-200 px-11 py-2 font-bold text-red-500">₹ {- booking.Amount}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <div className="flex justify-center mt-4">
                        <FaCheck className="text-green-500 text-4xl" />
                    </div>
                    <div className="flex justify-center mt-12">
                        {[...Array(Math.ceil(Walletbookings.length / itemsPerPage))].map((_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)} className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded">
                                {index + 1}
                            </button>
                        ))}
                    </div>

                </div>
            ) : (

                <span className="flex justify-center font-bold text-3xl  items-center  py-4 text-red-600">
                    There are no wallet bookings for this user!
                </span>

            )}

            {/* modal */}


            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Its a simple dialog.</DialogHeader>
                <DialogBody>
                    The key to more success is to have a lot of pillows. Put it this way,
                    it took me twenty five years to get these plants, twenty five years of
                    blood sweat and tears, and I&apos;m never giving up, I&apos;m just
                    getting started. I&apos;m up to something. Fan luv.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>








        </>
    )
}

export default Listwalletbookings
