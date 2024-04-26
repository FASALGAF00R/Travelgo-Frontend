import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchpackages } from '../../Api/Userapi';
import Background from '../../../src/Assests/Images/mountain-6968913_1280.jpg'



function Packagespage() {

  const navigate = useNavigate()


  const location = useLocation()
  const placeId = location.state
  const [packages, setpackages] = useState([])


  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetchpackages(placeId).then((response) => {
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
    navigate('/packagedetails', { state: id })

  }




  return (
    <>
      <div className='w-full h-screen '>
        <h3 className=' absolute font-extrabold text-white  text-8xl w-[80%] py-16 font-mono text-end animate-pulse'>PICK<span className='text-gray-800'>THE</span > BEST <span className='text-gray-800'>PACK</span>AGES</h3>
        <img className='h-full w-full ' src={Background} alt="backgroundimage" />
      </div>
      <h1 className='mt-8 font-bold text-center text-4xl text-gray-800'> Packages in {packages.length > 0 ? packages[0].Destrictname : '...'}</h1>
      

      {packages.length === 0 && <p className="text-center text-red-500 mt-4">Sorry, there are no packages available for this location.</p>}

      {/* ////////////////////////// */}


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
                <h1 className='capitalize pl-5 '>{pk.State}</h1>

              </div>
              <br />
              <br />
              <div className=' flex justify-between p-3'>
                <h1 className='capitalize pl-5  text-xl'><strong>${pk.amount}</strong></h1>

                <button onClick={() => handleclick(pk._id)} 
                  className='bg-white border-2 border-[#000000] p-2 rounded-sm hover:bg-black hover:text-white'
                  >View Package</button>
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
