import React, { useEffect, useState } from 'react'
import { Fetchplaces } from '../../Api/Agentapi';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Placedata, Blockplaces, UpdatePlace } from '../../Api/Agentapi';

// Add places
function Places() {
  const [placeModalOpen, setPlaceModalOpen] = useState(false)
  const [formdata, setformdata] = useState({
    Destrictname: '',
    description: '',
    image: null
  })
  const [Places, setPlaces] = useState([])
  const [editingPlace, setEditingPlace] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(() => {
    try {
      Fetchplaces()
        .then((response) => {
          setPlaces(response.data.placelist)
        });
    } catch (error) {
      console.log("error while fetching places", error);
    }
  }, [])


  // for opening and closing the modals
  const openModal = () => {
    setEditingPlace(null);
      setformdata({
    Destrictname: '',
    description: '',
    image: null
  });
    setPlaceModalOpen(!placeModalOpen);
    setErrorMessage('');
      
  };



  const handleEdit = (place) => {
    setEditingPlace(place);
    setformdata({
      Destrictname: place.Destrictname,
      description: place.Description,
      image: null
    });
    setPlaceModalOpen(true);
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formdata.Destrictname.trim() || !formdata.description.trim()) {
        setErrorMessage('All fields are required.');
        return;
      }
  

      if (Places.some(place => place.Destrictname.toLowerCase() === formdata.Destrictname.toLowerCase())) {
        setErrorMessage('Places name must be unique.');
        return;
      }
  

      if (Places.some(place => place.description.toLowerCase() === formdata.description.toLowerCase())) {
        setErrorMessage('Description name must be unique.');
        return;
      }


      if (editingPlace) {
        await UpdatePlace(editingPlace._id, { Data: formdata });
      } else {
        await Placedata(formdata)
          .then((response) => {
            setPlaces((prev) => [...prev, response.data.place]);
          });
        setPlaceModalOpen(false);
        setErrorMessage('');

      }
    } catch (error) {
      console.log(error);
    }
  };


  const handlechange = (e) => {
    const { name, value } = e.target
    if (name === 'image') {
      setformdata({
        ...formdata,
        [name]: e.target.files[0]
      })
    } else {
      setformdata({
        ...formdata,
        [name]: value

      });
    }
  };

  const handleBlock = async (placeId) => {
    const Response = await Blockplaces(placeId)
    setPlaces(prevPlaces => {
      return prevPlaces.map(place => {
        if (place._id === placeId) {
          return { ...place, isBlock: !place.isBlock };
        }
        return place;
      });
    })
  };





  return (
    <>
      <div className='flex justify-center'>
        <span className='font-extrabold text-blue-gray-700'>PLACES</span>
        <span className='font-extrabold text-gray-600'> MANAGEMENT</span>
      </div>
      <div className='flex p-8'>
        <div className="w-[100%] flex justify-end">
          <button onClick={openModal} className="bg-blue-gray-700 p-3  text-cyan-50 rounded-lg">Add places
          </button>
        </div>
      </div>
      <Dialog open={placeModalOpen} handler={openModal}>
  <DialogHeader>{editingPlace ? 'Edit Place' : 'Add Place'}</DialogHeader>
  <DialogBody>
    <form onSubmit={handleSubmit}>
      <div>
        <label className='text-gray-800' htmlFor="placeName">District Name:</label>
        <input className='w-full' type="text" id="Destrictname" name="Destrictname" value={formdata.Destrictname} onChange={handlechange} />
      </div>
      <div>
        <label className='text-gray-800' htmlFor="description">Description:</label>
        <textarea className='ml-0 w-full' id="description" name="description" value={formdata.description} onChange={handlechange} />
      </div>
      <div>
        <label className='text-gray-800' htmlFor="image">Upload image:</label>
        <input className='w-full' type="file" id="image" name="image" onChange={handlechange} />
      </div>
      <br />
      <Button type="submit" variant="gradient" color="green">Add</Button>
    </form>
    {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>} {/* Render error message here */}
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
        <div className='flex flex-col '>
          <div className='flex flex-wrap justify-center gap-5  '>
            {Places && Places.map((place) => (
              <div>
                <div className="flex justify-center">
                {!place.isBlock ? (
                  <Button className='bg-green-800  hover:scale-110' onClick={() => handleBlock(place._id)} >UnBlock</Button>
                ) : (
                  <Button className='bg-red-800   hover:scale-110' onClick={() => handleBlock(place._id)} >Block</Button>
                )}       
                </div>

                <div key={Places._id} onClick={() => handleEdit(place)} className='mt-8 b ml-2 w-72  shadow-2xl h-[400px] rounded-xl overflow-hidden card transform transition-transform duration-200 hover:scale-95 hover:shadow-md'>
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
        </div>

      </div>
    </>
  )
}

export default Places
