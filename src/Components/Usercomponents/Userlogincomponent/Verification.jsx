import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserVerify } from '../../../Api/Userapi';
import { ToastContainer, toast } from 'react-toastify';
import { RouteObjects } from '../../../Routes/RouteObject';

function Verification() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const result = await UserVerify(token);
        if (result.status === 200) {
          setTimeout(() => {
            toast.success('User verification success');
            navigate(RouteObjects.Login);
          }, 3000);

        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen  bg-[#e2a39aaa]">
      <div className="bg-white p-8 rounded-md  px-5 shadow-md">
        <h2 className="text-3xl font-light text-gray-900  mb-6">Email Verification</h2>
        <p className="text-gray-900 mb-4">
          Your email is being processed. Please wait for the verification to complete.
        </p>
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-green-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-green-500">User verification in process ....</p>
        </div>
        <p className="text-gray-700 mt-4">
          You will be redirected to the login page shortly.
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Verification;
