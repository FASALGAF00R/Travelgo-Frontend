import React, { useEffect, useState } from 'react';
import { CancelBookPayment, displayPackageDetails, fetchallBookings, submitReview } from '../../Api/Userapi';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Rating
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";


function Listbookings() {
  const selector = useSelector(state => state.user.userInfo);
  const username = selector.username;
  const userid = selector.id;

  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // State to store selected booking
  const [packageDetails, setPackageDetails] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [refresh, Setrefresh] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // State to track if submit button should be disabled




  const handleOpen = () => setOpen(!open);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await fetchallBookings(userid);
        setBookings(Res.data.bookings);
        Setrefresh(false)
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, [refresh]);





  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleClick = async (bookingid, userid, agentid) => {
    try {
      const CancelBook = await CancelBookPayment(bookingid, userid, agentid);
      Setrefresh(!refresh)
    } catch (error) {
      console.log(error);
    }
  };





  const handleDetailsButtonClick = async (packageId) => {

    const selectedBooking = bookings.find(booking => booking.packageId === packageId);
    setSelectedBooking(selectedBooking);
    try {
      const packageDetails = await displayPackageDetails(selectedBooking.packageId);
      setPackageDetails(packageDetails.data.packagedetails);
    } catch (error) {
      console.error('Error fetching package details:', error);
    }

    handleOpen();
  };


  const handleReviewSubmit = async () => {
    if (reviewText && rating) {

      try {
        const response = await submitReview(selectedBooking.packageId, selectedBooking.agentId, userid, reviewText, rating);
        toast.success("Review submitted successfully!")
        setReviewText("");
        setRating(0);
        setIsSubmitDisabled(true);

      } catch (error) {
        console.error('Error submitting review:', error);
        toast.error("Failed to submit review. Please try again!")

      }
    } else {
      toast.error("Please provide both review and rating!")

    }
  }










  return (
    <>
    <div class="mt-2"></div>
      {bookings.length > 0 ? (
        <div className="container mx-auto px-4 py-8 ">
          <h2 className="text-3xl font-semibold mb-4 animate-bounce text-green-600">User Bookings</h2>
          <div class="mt-4"></div>
          <table className="min-w-full  rounded-lg shadow-md ">
            <thead>
              <tr className='bg-gray-500'>
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
                <tr key={index} className="transition duration-500 ease-in-out transform hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{username}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date().toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-4 py-2">{booking.payment_type}</td>
                  <td className="border border-gray-200 px-4 py-2">{booking.phone}</td>
                  <td className="border border-gray-200 px-4 py-2">₹ {booking.Amount}</td>
                  {booking.isCanceled === true ? (
                    <td className="border border-gray-200 px-8 py-4 text-red-500 font-bold  rounded p-4">Returned</td>
                  ) : (
                    <td className="border border-gray-200 px-4 py-2 text-green-700 font-bold">{booking.bookingStatus}</td>
                  )}
                  <td className="border border-gray-200 px-8 py-4">
                    <Button onClick={() => handleDetailsButtonClick(booking.packageId)} variant="gradient">
                      Details
                    </Button></td>
                  {booking.isCanceled === false ? (
                    <td className="border border-gray-200 px-8 py-4"><button onClick={() => handleClick(booking._id, userid, booking.agentId)} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded p-4">Cancel</button></td>
                  ) : (
                    <td className=" border border-gray-200 px-11 py-2 text-red-800 font-bold">Canceled</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-9">
            {[...Array(Math.ceil(bookings.length / itemsPerPage))].map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded">
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <span className="flex justify-center text-red-600 text-3xl font-bold mt-48">There are no bookings for this user!</span>
      )}
  
      {/* modal */}
  
      <Dialog open={open} handler={handleOpen} style={{ width: '100vw', maxWidth: '1300px', height: '300vh', margin: '0 auto', padding: 0 }}>
        <DialogBody className="overflow-y-auto max-h-[70vh] text-gray-900">
          <DialogHeader>Booking Details</DialogHeader>
          {packageDetails ? (
            <div>
              <div className="grid grid-cols-3 gap-4">
                {packageDetails.Image.map((imageUrl, index) => (
                  <div key={index} className="bg-white p-2 shadow-md rounded-lg">
                    <img src={imageUrl} alt={`Image ${index + 1}`} className="w-full h-auto" />
                  </div>
                ))}
              </div>
  
              <h3>{packageDetails.Destrictname}, {packageDetails.State}</h3>
              <p><strong>Category:</strong> {packageDetails.category}</p>
              <p><strong>Details:</strong> {packageDetails.details}</p>
              <p><strong>Activities:</strong></p>
              <ul>
                {packageDetails.activites.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
              <p><strong>Amount per Day:</strong> ₹{packageDetails.perDAy}</p>
              <p><strong>Amount:</strong> ₹{packageDetails.amount}</p>
  
              <div className="mt-4">
                <h4 className="flex justify-center mb-5 text-lg font-semibold">Add Reviews</h4>
                <div className="flex items-center mb-2">
                  <input type="text" placeholder="Write a review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="flex-grow border text-gray-800 border-gray-900 rounded-lg p-2 mr-2" />
                </div>
                <div className="flex flex-col items-center">
                  <Button className='bg-green-700 ' onClick={handleReviewSubmit} variant="text" >Submit</Button>
                  <div className="font-bold mt-6">Ratings:</div>
                  <div className="mb-4">
                    <Rating value={rating} onChange={(value) => setRating(value)} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading package details...</p>
          )}
        </DialogBody>
  
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Close</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster/>
  
    </>
  
      );
}

      export default Listbookings;
