import React, { useEffect, useState } from 'react';
import { CancelBookPayment, fetchBookings } from '../../Api/Userapi';
import { useSelector } from 'react-redux';

function Listbookings() {

  const selector = useSelector(state => state.user.userInfo)
const username=selector.username
const userid=selector.id

  const [bookings, Setbookings] = useState([])

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const Res = await fetchBookings()
        console.log(Res, "Res");
        Setbookings(Res.data.bookings)


      } catch (error) {
        console.error('Error fetching bookings:', error);

      }



    }


    fetchdata()
  }, []);

  console.log(bookings, "bookings");


  const handleClick = async (bookingid, userid) => {
    console.log(bookingid,userid);
    try {
        const CancelBook = await CancelBookPayment( bookingid, userid )
        console.log(CancelBook, "Cancel book ");
      
    } catch (error) {
        console.log(error);
    }
}







  return (
    <>
      <div class="mt-4"></div>
      <div className="container mx-auto px-4 py-8 ml-8">
        <h2 className="text-3xl font-bold mb-4 animate-bounce text-green-600">User Bookings</h2>
        <div class="mt-4"></div>
        {bookings.length > 0 ? (
          <table className="min-w-full  rounded-xl shadow-md ">
            <thead>
              <tr>
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
              {bookings && bookings.map((booking, index) => (
                <tr key={index} className="transition duration-500 ease-in-out transform hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{username}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(booking.Date).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-4 py-2">stripe</td>
                  <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                  <td className="border border-gray-200 px-4 py-2">₹ {booking.Amount}</td>
                  <td className="border border-gray-200 px-4 py-2">{booking.bookingStatus}</td>
                  <td className="border border-gray-200 px-8 py-4"><button className="bg-green-500 hover:bg-green-700 text-white font-bold rounded p-4">Details</button></td>
                  <td className="border border-gray-200 px-8 py-4"><button onClick={() => handleClick(booking._id ,userid)}    className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded p-4">Cancel</button></td>
                </tr>
              ))}

            </tbody>
          </table>
        ) : (
          <span className="text-gray-600 text-3xl font-bold">There are no bookings for this user.</span>
        )}
        <div class="mb-9"></div>
        <div class="mb-9"></div>

      </div>


    </>
  )
}

export default Listbookings