import React, { useEffect, useState } from 'react'
import { Fetchplaces } from '../../Api/Agentapi';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Placedata } from '../../Api/Agentapi';
import { UpdatePlace } from '../../Api/Agentapi';
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
    setPlaceModalOpen(!placeModalOpen);

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
      if (editingPlace) {
        await UpdatePlace(editingPlace._id,{Data:formdata}); 
      }else{
        await Placedata(formdata);
      Fetchplaces()
      .then((response) => {
        setPlaces(response.data);
      });
      setPlaceModalOpen(false);
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
              <label className='text-gray-800 ' htmlFor="placeName">District Name:</label>
              <input className=' w-full ' type="text" id="Destrictname" name="Destrictname" value={formdata.Destrictname} onChange={handlechange} />
            </div>
            <div>
              <label className='text-gray-800 ' htmlFor="description">Description:</label>
              <textarea className='ml-0 w-full' id="description" name="description" value={formdata.description} onChange={handlechange} />
            </div>
            <div>
              <label className='text-gray-800 ' htmlFor="image">Upload image:</label>
              <input className=' w-full ' type="file" id="image" name="image" onChange={handlechange} />
            </div>
            <br />
            <Button type="submit" variant="gradient" color="green" onClick={openModal} >           
              Add
            </Button>
          </form>
        </DialogBody>
      </Dialog>

      <div>
        <div class="container px-16 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Places && Places.map((place) => (
            <div key={place._id} onClick={()=>handleEdit(place)} className="bg-gray-300 shadow-lg rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
              <img
                src={place.Image}
                alt={place.Destrictname}
                class=" object-cover"
              />
              <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <p class="text-white text-lg font-bold">{place.Destrictname}</p>
              </div>

                <p>{place.Description} </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Places
