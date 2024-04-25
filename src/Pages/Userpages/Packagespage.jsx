import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchpackages } from '../../Api/Userapi';
import Background from '../../../src/Assests/Images/mountain-6968913_1280.jpg'



function Packagespage() {

const navigate=useNavigate()


  const location = useLocation()
  const placeId = location.state
  const [packages, setpackages] = useState([])

  
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchpackages(placeId).then((response) => {
        console.log(response, 'pppppppppp');
        setpackages(response.data.fullpackage)

      })
        .catch((error) => {
          console.error('Error fetching categories:', error);
        });

    }
    fetchdata()
  }, [])



 const handleclick=(id)=>{
  navigate('/packagedetails',{state:id})

 }




  return (
    <>
      <div className='w-full h-screen '>
        <h3 className=' absolute font-extrabold text-white  text-8xl w-[80%] py-16 font-mono text-end animate-pulse'>PICK<span className='text-gray-800'>THE</span > BEST <span className='text-gray-800'>PACK</span>AGES</h3>
        <img className='h-full w-full ' src={Background} alt="backgroundimage" />
      </div>
      <h1 className=' mt-8 font-bold text-center text-4xl text-gray-800'>Packages in </h1>

      <div className=" mb-10 px-16 h-80 mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages && packages.map((pk) => (
          <div key={pk._id} className="flex  shadow-lg shadow-gray-400 border-2  border-gray-400 rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
            <img
              src={pk.Image[0]}
              alt={pk.Destrictname}
              className="object-cover w-full h-[50%]"
            />
            <div className="absolute inset-0 flex items-center justify-center  transition-opacity duration-200">
              <p className="text-white mb-10 text-lg font-bold ">{pk.Destrictname}</p>
              <p className='text-white mb-10 text-lg font-bold' >{pk.State}</p>
              <button  onClick={()=>handleclick(pk._id)} className="px-2 mt-16 border-2 border-black">
                <h1>View package</h1>
              </button>

            </div>
      

          </div>
        ))}
      </div>





    </>
  )
}

export default Packagespage
