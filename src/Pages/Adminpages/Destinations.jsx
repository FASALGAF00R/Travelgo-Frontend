import React, { useEffect, useState } from 'react'
// import { Fetchplaces } from '../../Api/Agentapi';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { Placedata } from '../../Api/Adminapi';


function Destinations() {
    const [placeModalOpen, setPlaceModalOpen] = useState(false)
    const [formdata, setformdata] = useState({
        State: '',
        Destrictname: '',
    })


    const [Places, setPlaces] = useState([])
    const [editingPlace, setEditingPlace] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [page, Setpages] = useState(1)
    const [limit, Setlimit] = useState(3)



    // useEffect(() => {
    //     try {
    //       Fetchplaces(page, limit)
    //         .then((response) => {
    //           setPlaces(response.data.placelist)
    //         });
    //     } catch (error) {
    //       console.log("error while fetching places", error);
    //     }
    //   }, [page, limit])


    // for opening and closing the modals
    const openModal = () => {
        setEditingPlace(null);
        setformdata({
            State: '',
            Destrictname: '',
        });
        setPlaceModalOpen(!placeModalOpen);
        setErrorMessage('');

    };


    //   const handleEdit = (place) => {
    //     setEditingPlace(place);
    //     setformdata({
    //       Destrictname: place.Destrictname,
    //       description: place.Description,
    //       image: null
    //     });
    //     setPlaceModalOpen(true);
    //   };

    // Function to check for duplicate state names
    const isDuplicateState = (newState) => {
        return Places.some(place => place.State.toLowerCase() === newState.toLowerCase());
    };

    // Function to check for duplicate district names
    const isDuplicateDistrict = (newDistrict) => {
        return Places.some(place => place.Destrictname.toLowerCase() === newDistrict.toLowerCase());
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formdata.Destrictname.trim() || !formdata.State.trim()) {
                setErrorMessage('All fields are required.');
                return;
            }

            if (isDuplicateState(formdata.State)) {
                setErrorMessage('State name must be unique.');
                return;
            }

            if (isDuplicateDistrict(formdata.Destrictname)) {
                setErrorMessage('District name must be unique.');
                return;
            }

            //   if (editingPlace) {
            //     await UpdatePlace(editingPlace._id, { Data: formdata });
            //   } else {
            await Placedata(formdata)
                .then((response) => {
                    setPlaces([...Places, response.data.place]);
                    // const totalPages = Math.ceil((prev.length + 1) / limit);
                    // Setpages(totalPages);
                });
            setPlaceModalOpen(false);
            setErrorMessage('');
            //   }
        } catch (error) {
            console.log(error);
        }
    };


    const handlechange = (e) => {
        const { name, value } = e.target
        setformdata({
            ...formdata,
            [name]: value

        });
    };




    //   const handleBlock = async (placeId) => {
    //     const Response = await Blockplaces(placeId)
    //     setPlaces(prevPlaces => {
    //       return prevPlaces.map(place => {
    //         if (place._id === placeId) {
    //           return { ...place, isBlock: !place.isBlock };
    //         }
    //         return place;
    //       });
    //     })
    //   };





    return (
        < >
            <div className='flex justify-center'>
                <span className='font-extrabold text-blue-gray-700'>PLACES</span>
                <span className='font-extrabold text-gray-600'> MANAGEMENT</span>
            </div>
            <div className='flex p-8'>
                <div className="w-[100%] flex justify-end">
                    <button onClick={openModal} className="bg-blue-gray-700 p-3  text-cyan-50 rounded-lg">Add
                    </button>
                </div>
            </div>
            <Dialog open={placeModalOpen} handler={openModal}>
                <DialogHeader>{editingPlace ? 'Edit Place' : 'Add Place'}</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className='text-gray-800' htmlFor="placeName">State name:</label>
                            <input className='w-full' id="State" name="State" value={formdata.State} onChange={handlechange} />
                        </div>
                        <div>
                            <label className='text-gray-800' htmlFor="description">District name:</label>
                            <textarea className='w-full' type="text" id="Destrictname" name="Destrictname" value={formdata.Destrictname} onChange={handlechange} />
                        </div>
                        <br />
                        <Button type="submit" variant="gradient" color="green">Add</Button>
                    </form>
                    <div>
                        {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
                    </div>
                </DialogBody>

            </Dialog>


            <div>
                {/* <div className="container bg-black  px-16 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Places && Places.map((place) => (
            <div key={place._id} onClick={()=>handleEdit(place)} className="bg-gray-300 shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
              <img
                src={place.Image}
                alt={place.Destrictname}
                class=" object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p className="text-white text-lg font-bold">{place.Destrictname}</p>
              </div>

                <p>{place.Description} </p>
            </div>
          ))}
        </div> */}
                {/* <div className='flex flex-col '>
          <div className='flex flex-wrap justify-center gap-5  '>
            {Places && Places.map((place) => (
              <div>     
                <div className="flex justify-center">
                  {!place.isBlock ? (
                    <Button className='bg-red-800  hover:scale-110' onClick={() => handleBlock(place._id)} >Block</Button>
                  ) : (
                    <Button className='bg-green-800   hover:scale-110' onClick={() => handleBlock(place._id)} >unBlock</Button>
                  )}
                </div>

                <div key={Places._id} onClick={() => handleEdit(place)} className='mt-8  ml-2 w-72  shadow-2xl h-[400px] rounded-xl overflow-hidden card transform transition-transform duration-200 hover:scale-95 hover:shadow-md'>
                  <div className="relative">
                    <img
                      src={place.Image}
                      alt={place.Destrictname}
                      className="object-cover w-full h-48"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                      <p className="text-white text-lg font-bold">{place.Destrictname}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p>{place.Description}</p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}



                {/* <div className="flex items-center my-9 justify-center space-x-4">
          <button className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-gray-700  hover:text-white px-3" onClick={() => Setpages(page - 1)}>
            <div className="flex flex-row align-middle">
              <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              <p className="ml-2">Prev</p>
            </div>
          </button>
          <span className="text-gray-700">Page: {page}</span>
          <button className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-blue-gray-700 hover:text-white px-3" onClick={() => Setpages(page + 1)}>
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </button>
        </div> */}



            </div>






        </>
    )
}

export default Destinations
