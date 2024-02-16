import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Placedata } from '../../Api/Agentapi';

function Places() {

  const [place, setplace] = useState(false)
  const [formdata, setformdata] = useState({
    place: '',
    description: '',
    image: null
  })

  const Modalshow = () => {
    setplace(!place)
  }



  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log('Form submitted')
    const Response =await Placedata(formdata)
  };

  const handlechange = (e) => {

    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className='flex p-8'>
        <button onClick={Modalshow} className="bg-blue-gray-700 p-3 text-cyan-50 rounded-sm">Add places
        </button>
      </div>
      <Dialog open={place} handler={Modalshow}>
        <DialogHeader>Enter Place Details</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='text-gray-800 ' htmlFor="placeName">Place Name:</label>
              <input className=' w-full ' type="text" id="placeName" name="place" value={formdata.place} onChange={handlechange} />
            </div>
            <div>
              <label className='text-gray-800 ' htmlFor="description">Description:</label>
              <textarea className='ml-0 w-full' id="description" name="description" value={formdata.description} onChange={handlechange} />
            </div>
            <div>
              <label className='text-gray-800 ' htmlFor="image">Upload image:</label>
              <input className=' w-full ' type="file" id="image" name="image/*" onChange={(e)=> setformdata({...formdata,image:e.target.files[0]})} />
            </div>
            <br />
            <Button type="submit" variant="gradient" color="green" onClick={Modalshow}>
             Add
            </Button>
          </form>
        </DialogBody>
      </Dialog>


    </>
  )
}

export default Places
