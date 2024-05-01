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
  Addpackagedata,
  fetchstate,
  fetchpackage,
  Blockpackages
} from '../../Api/Agentapi';

function Packages() {
  const [pack, Setpackage] = useState([])
  const [previewSource, setPreviewSource] = useState([])
  const [category, setcategory] = useState([])
  const [activity, setactivity] = useState([])
  const [state, Setstate] = useState([])
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [formData, setFormData] = useState({
    State: '',
    Destrictname: '',
    image: null,
    category: '',
    description: '',
    activities: [],
    amount: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  const perpage = 2
  const indexoflastitem = currentPage * perpage;
  const firstindexofitem = indexoflastitem - perpage;


  const currentItems = pack.slice(firstindexofitem, indexoflastitem);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const totalPages = Math.ceil(pack.length / perpage);



  const handleOpen = () => setOpen(!open);

  const handleImageUpload = async (e) => {
    const file = e.target.files;
    try {
      const urls = await uploadImage(file);
      console.log(urls, "urls");
      setPreviewSource(urls)

      // setFormData({
      //   ...formData,
      //   image: urls });

    } catch (error) {
      console.error("Error uploading images:", error);

    }

    console.log(file, "ooooooooooo");

  };

  const uploadImage = async (files) => {
    console.log(files, "files");
    try {
      const uploadedImageUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "dev_setups");

        const cloudinaryResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dqewi7vjr/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error(`Failed to upload image. Status: ${cloudinaryResponse.status}`);
        }

        const cloudinaryData = await cloudinaryResponse.json();

        if (cloudinaryData.error) {
          console.log(cloudinaryData.error);
          return;
        }

        const uploadedImageUrl = cloudinaryData.secure_url;
        uploadedImageUrls.push(uploadedImageUrl);
      }

      console.log("Uploaded Image URLs:", uploadedImageUrls);
      return uploadedImageUrls;
    } catch (error) {
      console.log("Error during image upload:", error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchcatgeory();
        setcategory(response.data.Categories);

        const Response = await fetchActivities();
        setactivity(Response.data.Activities)

        const res = await fetchstate()
        Setstate(res.data.States)


        const Res = await fetchpackage()
        console.log(Res, "res");
        Setpackage(Res.data.pack)




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
      const data = {
        ...formData,
        image: previewSource
      }

      const res = await Addpackagedata(data);
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

  const handleblock = async (packid) => {
    const Response = await Blockpackages(packid)
    Setpackage(prevpack => {
      return prevpack.map(pk => {
        if (pk._id === packid) {
          return { ...pk, isBlock: !pk.isBlock };

        }
        return pk
      })
    })

  }







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
              <label className="mb-2" htmlFor="State">state</label>
              <select
                className="p-2 border border-gray-300 rounded"
                type="text"
                id="State"
                name="State"
                value={formData.State}
                onChange={handleChange}
                onClick={handleclick}
              >
                <option value="" >select state</option>
                <option value="Kerala" >Kerala</option> {/* {state.map(st => (
                  <option key={st._id} value={st.State}>{st.State}</option>
                ))} */}
              </select>

            </div>


            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="State">district name</label>
              <select
                className="p-2 border border-gray-300 rounded"
                type="text"
                id="Destrictname"
                name="Destrictname"
                value={formData.Destrictname}
                onChange={handleChange}
                onClick={handleclick}
              >
                <option value="">Select district</option>
                {state.map(st => (
                  <option key={st._id} value={st.Destrictname}>{st.Destrictname}</option>
                ))}
              </select>
            </div>





            <div className="flex flex-col mb-4">
              <label className="mb-2" htmlFor="imageUpload">Image Upload:</label>
              <input
                className="p-2 border border-gray-300 rounded"
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                multiple
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


      {pack && pack.length > 0 ? (
        <div className=" mb-10 px-16 w-full   mt-8  grid    gap-12">
          {pack && currentItems.map((pk) => (

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
                  <h1 className='capitalize pl-5 '>{pk.category}</h1>
                  <h1 className='capitalize pl-5 '>{pk.details}</h1>

                </div>
                <br />
                <br />
                <div className=' flex justify-between p-3'>
                  <h1 className='capitalize pl-5  text-xl'><strong>${pk.amount}</strong></h1>
                  {!pk.isBlock ? (
                    <button onClick={() => handleblock(pk._id)}
                      className='bg-white border-2 border-[#000000] p-2 rounded-sm hover:bg-black hover:text-white'
                    >Block</button>
                  ) : (
                    <button onClick={() => handleblock(pk._id)}
                      className='bg-white border-2 border-[#000000] p-2 rounded-sm hover:bg-black hover:text-white'
                    >unBlock</button>
                  )}
                </div>
                <br />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-red-700 text-center'>No Packages available!</p>

      )}


      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>














    </>
  )
}

export default Packages
