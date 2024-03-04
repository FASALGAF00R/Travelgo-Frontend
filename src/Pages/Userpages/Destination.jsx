import React, { useEffect, useState } from 'react'
import { Placedata } from '../../Api/Userapi'
import { Searchplaces } from '../../Api/Userapi'
function Destination() {

  const [places, setplaces] = useState([])
  const [search, setsearch] = useState('')
  const [page, setPage] = useState(2);
  const [limit, setLimit] = useState(1)

  useEffect(() => {
    const fetchplaces = async () => {
      try {
        const response = await Placedata(page, limit)
        setplaces(response.data.places)
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    }

    fetchplaces()

  }, [page, limit])

  const handleInputChange = (e) => {
    setsearch(e.target.value)
  }

  const handleSearch = async () => {
    try {
      if (search.length === 0) {
        return
      }
      const response = await Searchplaces({ Data: search })
      setplaces(response.data)
      setsearch('')
    } catch (error) {
      console.error('Error searching:', error);
    }
  };




  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <div className='bg-pink-50' >
        <br></br>
        <div class="mx-auto  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 focus-within:border-gray-300 shadow-xl ">
          <input id="search-bar" placeholder="Search destrict name" value={search} onChange={handleInputChange} class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
          <button onClick={handleSearch} class="w-full md:w-auto px-6 py-3 bg-gray-800  text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
            <div class="relative">
              <div class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                <svg class="opacity-0 animate-spin w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div class="flex items-center transition-all opacity-1 valid:"><span
                class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                Search
              </span>
              </div>
            </div>
          </button>
        </div>
        <br></br>

        <div class="grid grid-cols-1">
          <div class="text-3xl font-serif mx-2 text-right text-gray-700 px-5 animate__animated animate__fadeIn">Travel to your dream places</div>
        </div>





        <div className="container bg-pink-50 px-16 py-6 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-12  shadow-2xl ">
          {places && places.map((place) => (
            <div key={place._id} className=" group bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
              <div className="overflow-hidden card transform transition-transform duration-200 hover:scale-105">
                <img
                  src={place.Image}
                  alt={place.Destrictname}
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-lg font-bold">{place.Destrictname}</p>
                </div>
              </div>
              <p>{place.Description}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center my-9 justify-center space-x-4">
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page - 1)}>Previous</button>
          <span className="text-gray-700">Page: {page}</span>
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page + 1)}>Next</button>
        </div>



      </div>
      <br />

    </>
  )
}

export default Destination
