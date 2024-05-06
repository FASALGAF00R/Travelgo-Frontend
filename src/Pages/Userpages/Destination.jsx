import React, { useEffect, useState } from 'react';
import { Placedata } from '../../Api/Userapi';
import { useNavigate } from 'react-router-dom';

function Destination() {
  const navigate = useNavigate()
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await Placedata(page, limit);
        const filteredPlaces = response.data.places.filter(place => !place.isBlock);
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, [page, limit]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    filterPlaces(e.target.value);

  };



  const filterPlaces = (searchTerm) => {
    if (!searchTerm) {
      // Reset to original places when search term is empty
      const fetchOriginalPlaces = async () => {
        try {
          const response = await Placedata(page, limit);
          const filteredPlaces = response.data.places.filter(place => !place.isBlock);
          setPlaces(filteredPlaces);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      };
      fetchOriginalPlaces();
    } else {
      // Filter places based on search term
      const filteredPlaces = places.filter(place => place.Destrictname.toLowerCase().includes(searchTerm.toLowerCase()));
      setPlaces(filteredPlaces);
    }
  };



  const handleClick = async (id) => {
    navigate('/packages', { state: id })

  }


  const handleReset = () => {
    setSearch('');
    setPage(1);
    const fetchOriginalPlaces = async () => {
      try {
        const response = await Placedata(page, limit);
        const filteredPlaces = response.data.places.filter(place => !place.isBlock);
        setPlaces(filteredPlaces);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
    fetchOriginalPlaces();
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      <div className=''>
        <br />
        <div class="mb-8 "></div>
        <div className="mx-auto  relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 focus-within:border-gray-300 shadow-xl">
          <input id="search-bar" placeholder="Search district name" value={search} onChange={handleInputChange} className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
          <button onClick={handleReset} className="w-full md:w-auto px-6 py-3 bg-gray-800 text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
            <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">Reset</span>
          </button>
        </div>
        <br />
        <div className="grid grid-cols-1">
          <div className="text-3xl font-serif mx-2 text-right text-gray-700 px-5 animate__animated animate__fadeIn">Travel to your dream places</div>
        </div>
        <div className="container  px-16 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-12 shadow-lg ">
          {places.length === 0 ? (
            <div className="align-bottom text-red-600">No properties available</div>
          ) : (
            places.map((place) => (
              <div
                key={place._id}
                onClick={() => handleClick(place._id)}
                className="group bg-white shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md shadow-gray-500"
              >
                <div className="overflow-hidden card transform transition-transform duration-200 hover:scale-105">
                  <img src={place.Image} alt={place.Destrictname} className="object-cover  h-40 w-full" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                    {/* <p className="text-white text-lg font-bold">{place.State}</p> */}
                  </div>
                </div>
                <p className="text-gray-900 ml-3 text-lg font-medium">{place.Destrictname}</p>
                <p className="text-gray-900 p-1 mt-2  overflow-hidden overflow-ellipsis">{place.Description}</p>
              </div>
            ))
          )}
        </div>

        <div className=" flex items-center mt-10 justify-center space-x-4">
          <button disabled={page === 1} className="text-gray-800 underline py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page - 1)}>Previous</button>
          <span className="text-gray-800">Page: {page}</span>
          <button className=" underline text-gray-800 py-2 px-4 rounded-lg transition-colors duration-300" onClick={() => setPage(page + 1)}>Next</button>
      <div class="mb-20"></div>
        </div>
      </div>

    </>
  );
}

export default Destination;

