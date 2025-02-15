import React, { useEffect, useState } from 'react';
import { Placedata } from '../../Api/Userapi';
import { useNavigate } from 'react-router-dom';

function Destination() {
  const navigate = useNavigate()
  const [places, setPlaces] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await Placedata(page, limit);
        const filteredPlaces = response.data.places.filter(place => place.isBlock===true);
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [page, limit,places]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlaces = places.filter(place =>
    place.Destrictname.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleClick = async (id) => {
    navigate('/packages', { state: id })

  }




  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <div className=''>
        <br />
        <div className="mx-auto relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 focus-within:border-gray-300 shadow-xl">
          <input id="search-bar" placeholder="Search district " className="px-6 py-2  w-full rounded-md flex-1 outline-none bg-white placeholder-gray-900" value={searchQuery} onChange={handleSearchChange} />
       
        </div>
        <br />
        <div className="grid grid-cols-1">
          <div className="text-3xl mb-5 font-serif mx-2 text-right text-gray-700 px-5 animate__animated animate__fadeIn">Travel to your dream places</div>
        </div>
        <div className="container px-16  py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-12 shadow-lg">
          {filteredPlaces.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-600 font-bold text-3xl text-center ">No properties available!</div>
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <div
              key={place._id}
              onClick={() => handleClick(place._id)}
              className="group bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md shadow-gray-500"
            >
              <div className="overflow-hidden card transform transition-transform duration-200 hover:scale-105">
                <img src={place.Image} alt={place.Destrictname} className="object-cover h-40 w-full" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-900 text-lg font-semibold">{place.Destrictname}</p>
                <p className="text-gray-900 mt-2 overflow-hidden overflow-ellipsis">{place.Description.length > 100 ? `${place.Description.substring(0, 100)}...` : place.Description}</p>
              </div>
            </div>
            
            ))
          )}
        </div>
        <div className="flex items-center mt-10 justify-center space-x-4">
          <button disabled={page === 1} className="text-gray-800 underline py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page - 1)}>Previous</button>
          <span className="text-gray-800">Page: {page}</span>
          <button className="underline text-gray-800 py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page + 1)}>Next</button>
          <div className="mb-20"></div>
        </div>
      </div>

    </>
  );
}

export default Destination;

