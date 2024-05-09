import React, { useEffect, useState } from 'react';
import { allBookings } from '../../Api/Agentapi';
import { useSelector } from 'react-redux';

function Bookings() {
    const selector = useSelector(state => state.user.userInfo);
    const username = selector.username;
    const userid = selector.id;

    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2); 

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const Res = await allBookings();
                console.log(Res, "Res");
                setBookings(Res.data.bookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchdata();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {bookings.length > 0 ? (
                <div className="container mx-auto px-4 py-8 ">
                    <h2 className="text-3xl font-bold mb-4  text-gray-800">User Bookings</h2>
                    <div class="mt-10"></div>
                    
                    <table className="min-w-full  rounded-xl shadow-md ">
                        <thead>
                            <tr className='bg-gray-600'>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800 ">No</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Username</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Date</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Payment Type</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Mobile</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Amount</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Status</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Details</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Cancel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking, index) => (
                                <tr key={index} className="transition  duration-500 ease-in-out transform hover:bg-gray-100">
                                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{username}</td>
                                    <td className="border border-gray-200 px-4 py-2">{new Date(booking.Date).toLocaleDateString()}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.payment_type}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                                    <td className="border border-gray-200 px-4 py-2">₹ {booking.Amount}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.bookingStatus}</td>
                                    <td className="border border-gray-200 px-8 py-4"><button className="bg-gray-800 hover:bg-gray-700 text-white font-bold rounded p-4">Details</button></td>
                                    {booking.isCanceled === false ? (
                                        <td className="border border-gray-200 px-8 py-4"><button onClick={() => handleClick(booking._id, userid)} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded p-4">Cancel</button></td>
                                    ) : (
                                        <td className="border border-gray-200 px-4 py-2 text-red-800 font-bold">Canceled</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="mb-28"></div>

            <div className="flex justify-center mt-4">
                {[...Array(Math.ceil(bookings.length / itemsPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className="bg-gray-800  text-white font-bold py-2 px-4 mx-1 rounded">
                        {index + 1}
                    </button>
                ))}
            </div>
                </div>
            ) : (
                <span className="flex justify-center text-red-600 text-3xl font-bold ">There are no bookings available</span>
            )}
            </>
    );
}

export default Bookings;
