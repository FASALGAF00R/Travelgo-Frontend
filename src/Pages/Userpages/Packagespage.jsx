import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchpackages } from '../../Api/Userapi';
import Background from '../../../src/Assests/Images/mountain-6968913_1280.jpg'
import { MdCardTravel } from "react-icons/md";



function Packagespage({ categoryType, searchactivity, priceRange }) {

  const navigate = useNavigate()


  const location = useLocation()
  const placeId = location.state
  const [packages, setpackages] = useState([])


  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchpackages(placeId, categoryType).then((response) => {
        console.log(response, 'pppppppppp');
        const filteredPackages = response.data.fullpackage.filter(pk => pk.isBlock === true);

        setpackages(filteredPackages)

      })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });

    }
    fetchdata()
  }, [])

  console.log(packages, "packages");

  const handleclick = (id) => {
    console.log(id, "id");
    navigate('/packagedetails', { state: id })

  }





  return (
    <>

      <div className='w-full h-screen relative'>
        <h3 className='absolute font-mono text-white text-8xl w-[80%] py-40 text-end animate-pulse'>PICK <span className='text-gray-800'>THE </span > BEST <span >PACK</span><span className='text-gray-800'>AGES </span> </h3>
        <img className='h-full w-full' src={Background} alt="backgroundimage" />
        <svg className="absolute animate-bounce w-12 h-16 bottom-0 left-1/2 transform -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <h1 className='mt-8 font-bold text-center text-4xl text-gray-800'> Packages in {packages.length > 0 ? packages[0].Destrictname : '...'}</h1>


      {packages.length === 0 && <p className="text-center text-red-500 mt-4">Sorry, there are no packages available for this location.</p>}

      <div className=" mb-10 px-16 h-fit mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages && packages.map((pk) => (
          <div key={pk._id} className="shadow-lg shadow-gray-400 border-2  border-gray-400 rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <img
              src={pk.Image[0]}
              alt={pk.Destrictname}
              className="object-cover w-full h-40"
            />
            <div>
              <div className=''>
                <h1 className='capitalize pl-5  text-xl'><strong>{pk.Destrictname}</strong></h1>
                <div className='flex justify-between mr-10'>
                  <h1 className='capitalize pl-5 '>{pk.State}</h1>
                  <span span className=''><MdCardTravel />   </span>
                </div>

              </div>

              <div className=' flex justify-between p-3 flex-row'>
                <h1 className='capitalize pl-5  text-xl'><strong>₹{pk.amount}</strong></h1>
                <button onClick={() => handleclick(pk._id)}
                  className='bg-white border-2  border-[#3e3e3e] p-2 rounded-sm hover:bg-gray-800 hover:text-white'
                >View Package
                </button>
              </div>
              <br />
            </div>
          </div>
        ))}

      </div>



    </>
  )
}

export default Packagespage
