import React, { useEffect, useState } from 'react';
import { CancelBookPayment, fetchBookings } from '../../Api/Userapi';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';

function Listwalletbookings() {


    const location = useLocation();
    console.log(location, "ggggggggg");
    const searchParams = new URLSearchParams(location.search);
    const walletAmount = parseFloat(searchParams.get('wallet')); // Parse as float
    console.log(walletAmount, "'wallet");

    const selector = useSelector(state => state.user.userInfo)
    const username = selector.username
    const userid = selector.id

    const [Walletbookings, SetWalletbookings] = useState([])


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const Res = await fetchBookings()
                console.log(Res, "Res");
                SetWalletbookings(Res.data.bookings)

            } catch (error) {
                console.error('Error fetching bookings:', error)
            }

        }

        fetchdata()
    }, []);

    const calculateDebitedAmount = booking => {
        return walletAmount - parseFloat(booking.Amount);
    };


    return (
        <>
                  <div class="mt-16"></div>

            <div className="container mx-auto px-8 py-4">
                <h2 className="text-3xl font-bold mb-2 animate-bounce text-green-600">Wallet Bookings</h2>
                <div className="flex justify-end text-lg font-bold mb-2">Current Wallet Amount:</div>
                <div className="flex justify-end text-xl font-bold text-green-600 mb-4">₹ {walletAmount}</div>
                <table className="w-full rounded-xl shadow-md">
                    <thead>
                        <tr>
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
                        {Walletbookings.map((booking, index) => (
                            <tr key={index} className="transition duration-500 ease-in-out transform hover:bg-gray-100">
                                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-200 px-4 py-2">{username}</td>
                                <td className="border border-gray-200 px-4 py-2">{new Date(booking.Date).toLocaleDateString()}</td>
                                <td className="border border-gray-200 px-4 py-2">{booking.payment_type}</td>
                                <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                                <td className="border border-gray-200 px-4 py-2">₹ {walletAmount + parseFloat(booking.Amount)}</td>
                                <td className="border border-gray-200 px-4 py-2 font-bold text-green-500">{booking.bookingStatus}</td>
                                <td className="border border-gray-200 px-4 py-2">
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-2 py-1">Details</button>
                                </td>
                                <td className="border border-gray-200 px-4 py-2 font-bold text-red-500">₹ {-booking.Amount}</td>
                            </tr>
                        ))}
                        {Walletbookings.length === 0 && (
                            <tr>
                                <td colSpan="9" className="text-center py-4 text-red-600">There are no wallet bookings for this user</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                <FaCheck className="text-green-500 text-4xl" /> {/* Check icon */}
            </div>
            </div>
        </>
    )
}

export default Listwalletbookings