import React, { useEffect, useState } from 'react';
import { allBookings } from '../../Api/Agentapi';
import { useSelector } from 'react-redux';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function Bookings() {
    const selector = useSelector(state => state.user.userInfo);
    const agentselector = useSelector(state => state.agent.agentInfo)

    const username = selector.username;
    const userid = selector.id;

    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [user, Setname] = useState('')

    const handleOpen = () => setOpen(!open);




    useEffect(() => {
        const fetchdata = async () => {
            try {
                const Res = await allBookings();
                const datas = Res.data.bookings
              
                const filteredData = datas.filter((item) => item.agentId === agentselector.id)
                setBookings(filteredData)
        

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

                    <table className="min-w-full  rounded-xl shadow-md  ml-2">
                        <thead>
                            <tr className='bg-gray-500'>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800 ">No</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Username</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Date</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Payment Type</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Mobile</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Amount</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Details</th>
                                <th className="border border-gray-200 px-4 py-2 text-gray-800">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((booking, index) => (
                                <tr key={index} className="transition  duration-500 ease-in-out transform hover:bg-gray-100">
                                    <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.userName}</td>
                                    <td className="border border-gray-200 px-4 py-2">{new Date(booking.Date).toLocaleDateString()}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.payment_type}</td>
                                    <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                                    <td className="border border-gray-200 px-4 py-2">₹ {booking.Amount}</td>
                                    <td className="border border-gray-200 px-8 py-4">
                                        <Button onClick={handleOpen} variant="gradient">
                                            Details
                                        </Button>



                                    </td>
                                    {booking.isCanceled === false ? (
                                        <td className="border border-gray-200 px-8 py-4 text-green-80 text-green-800 font-bold">{booking.bookingStatus}</td>
                                    ) : (
                                        <td className="border border-gray-200 px-4 py-2 text-red-800 font-bold">Canceled</td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="mb-20"></div>

                    <div className="flex justify-center mt-64">
                        {[...Array(Math.ceil(bookings.length / itemsPerPage))].map((_, index) => (
                            <button key={index} onClick={() => paginate(index + 1)} className="bg-gray-800  text-white font-bold py-2 px-4 mx-1 rounded">
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <span className="flex justify-center text-red-600 text-xl font-bold mt-48">There are no bookings available !</span>
            )}






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
    );




}

export default Bookings;
