import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Checkbox,
} from "@material-tailwind/react";
import {
  fetchcatgeory,
  fetchActivities,
  Addpackagedata
} from '../../Api/Agentapi';

function Packages() {
  const [category, setcategory] = useState([])
  const [activity, setactivity] = useState([])
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    placeName: '',
    image: null,
    category: '',
    description: '',
    activities: [],
    amount: ''
  });

  // console.log(category,"lkjk");

  const handleOpen = () => setOpen(!open);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchcatgeory();

        setcategory(response.data.Categories);

        const Response = await fetchActivities();
        setactivity(Response.data.Activities)


      } catch (error) {
        console.log("Error while fetching category/activity:", error);
      }
    };

    fetchData();
  }, [refresh]);


  const handleclick = () => {
    refresh === true ? setRefresh(false) : setRefresh(true);
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'amount') {
      if (!isNaN(value) && parseFloat(value) >= 0) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      return;
    }
      setFormData({
      ...formData,
      [name]: value
    });
  };
  



  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        activities: [...formData.activities, name]
      });
    } else {
      setFormData({
        ...formData,
        activities: formData.activities.filter(activity => activity !== name)
      });
    }
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await Addpackagedata(formData);
      console.log(res);
    } catch (error) {
      console.log("error while submitting form", error);
    }

    setFormData({
      placeName: '',
      image: null,
      category: '',
      description: '',
      activities: [],
      amount: ''
    });
    setOpen(false);
  };

  return (
    <>
      <div className='flex justify-center'>

        <span className='font-extrabold text-blue-gray-700'>PACKAGES</span>
        <span className='font-extrabold text-gray-600'> MANAGEMENT</span>

      </div>

      <div className='flex p-8'>
        <div className="w-[100%] flex justify-end">
          <button onClick={handleOpen} className="bg-blue-gray-700 p-3  text-cyan-50 rounded-lg">Add package
          </button>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen} size="md" >
        <DialogHeader>Add package</DialogHeader>
        <DialogBody className="max-h-80 overflow-y-auto" >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="placeName">Place Name:</label>
              <input
                className="p-2 border border-gray-300 rounded"
                type="text"
                id="placeName"
                name="placeName"
                value={formData.placeName}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="imageUpload">Image Upload:</label>
              <input
                className="p-2 border border-gray-300 rounded"
                type="file"
                id="image"
                name="image"
                onChange={handleImageUpload}

              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="category">Category:</label>
              <select
                className="p-2 border border-gray-300 rounded"
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                onClick={handleclick}
              >
                <option value="">Select Category</option>
                {category.map(cat => (
                  <option key={cat._id} value={cat.Name}>{cat.Name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="description">Description:</label>
              <textarea
                className="p-2 border border-gray-300 rounded"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="activities">Activities:</label>
              {activity.map(act => (
                <div key={act._id} className="flex items-center">
                  <Checkbox
                    id={act._id}
                    name={act.Activity}
                    color="green"
                    onChange={handleCheckboxChange}
                    onClick={handleclick}

                  />
                  <label htmlFor={act._id} className="ml-2">{act.Activity}</label>
                </div>
              ))}
            </div>

            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="amount">Amount:</label>
              <input
                className="p-2 border border-gray-300 rounded"
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
          </form>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button variant="gradient" color="green" onClick={(e) => { handleOpen(); handleSubmit(e); }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Packages
