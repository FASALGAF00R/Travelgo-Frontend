import React, { useEffect, useState } from 'react'
import { Fetchplaces } from '../../Api/Agentapi';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Placedata, Blockplaces, UpdatePlace, States } from '../../Api/Agentapi';
import { useSelector } from 'react-redux';
// Add places
function Places() {

  const selector = useSelector(state => state.agent.agentInfo)
  console.log(selector, "selector");



  const [placeModalOpen, setPlaceModalOpen] = useState(false)
  const [formdata, setformdata] = useState({
    State: '',
    Destrictname: '',
    description: '',
    image: null
  })
  const [Places, setPlaces] = useState([])
  const [editingPlace, setEditingPlace] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, Setpages] = useState(1)
  const [limit, Setlimit] = useState(3)
  const [refresh, setRefresh] = useState(false);



  useEffect(() => {
    try {
      Fetchplaces(page, limit)
        .then((response) => {
          const datas = response.data.placelist
          const filteredData = datas.filter((item) => item.agentid === selector.id)
          setPlaces(filteredData)
        });

    } catch (error) {
      console.log("error while fetching places", error);
    }
  }, [page, limit])




  // for opening and closing the modals
  const openModal = () => {
    setRefresh(true)

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


  const handleclick = () => {
    refresh === true ? setRefresh(false) : setRefresh(true);
  }



  const handleSubmit = async (e) => {
    setRefresh(false)
    e.preventDefault();
    try {
      if (!formdata.Destrictname.trim() || !formdata.description.trim()) {
        setErrorMessage('All fields are required.');
        return;
      }

      const isDuplicate = Places.some(place => place.Destrictname.toLowerCase() === formdata.Destrictname.toLowerCase());
      if (isDuplicate) {
        setErrorMessage('District name must be unique.');
        return;
      }

      if (editingPlace) {
        await UpdatePlace(editingPlace._id, { Data: formdata });
      } else {
        const response = await Placedata(formdata, selector.id)
        console.log(response.data.place, "response");
        setPlaces((prevPlaces) => {
          const newPlaces = [...prevPlaces, response.data.place];
          const totalPages = Math.ceil(newPlaces.length / limit);
          Setpages(totalPages);
          return newPlaces;
        });

        setPlaceModalOpen(!placeModalOpen);
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

            <div className="flex flex-col mb-4">
              <label className="mb-2 text-blue-gray-900 font-medium" htmlFor="State">State:</label>
              <select
                className="p-2 border border-gray-300 rounded text-blue-gray-900 font-medium"
                id="State"
                name="State"
                value={formdata.State}
                onChange={handlechange}
              >
                <option value="" >select state</option>
                <option value="Kerala" >Kerala</option>

              </select>
            </div>


            <div className="flex flex-col mb-4">
              <label className="mb-2 text-blue-gray-900 font-medium" htmlFor="Destrictname">Destrictname:</label>
              <select
                className="p-2 border border-gray-300 rounded text-blue-gray-900 font-medium"
                id="Destrictname"
                name="Destrictname"
                value={formdata.Destrictname}
                onChange={handlechange}
              >
                <option value="" >select Destrictname</option>
                <option value="Alappuzha">Alappuzha</option>
                <option value="Ernakulam">Ernakulam</option>
                <option value="Idukki">Idukki</option>
                <option value="Kannur">Kannur</option>
                <option value="Kasaragod">Kasaragod</option>
                <option value="Kollam">Kollam</option>
                <option value="Kottayam">Kottayam</option>
                <option value="Kozhikode">Kozhikode</option>
                <option value="Malappuram">Malappuram</option>
                <option value="Palakkad">Palakkad</option>
                <option value="Pathanamthitta">Pathanamthitta</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                <option value="Thrissur">Thrissur</option>
                <option value="Wayanad">Wayanad</option>
              </select>
            </div>

            <div>
              <label className='text-blue-gray-900 font-medium ' htmlFor="description">Description:</label>
              <textarea className='ml-0 w-full text-blue-gray-900 font-medium' id="description" name="description" value={formdata.description} onChange={handlechange} />
            </div>
            <div>
              <label className='text-blue-gray-900 font-medium' htmlFor="image">Upload image:</label>
              <input className='w-full' type="file" id="image" name="image" onChange={handlechange} />
            </div>
            <br />
            <Button type="submit" variant="gradient" color="green">Add</Button>
          </form>
          {errorMessage && <p className='text-red-500 text-center'>{errorMessage}</p>}
        </DialogBody>
      </Dialog>


      {Places.length > 0 ? (
        <div>
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-center gap-5'>
              {Places.map((place) => (
                <div key={place._id}>
                  <div className="flex justify-center">
                    {!place.isBlock ? (
                      <Button className='bg-green-800 hover:scale-110' onClick={() => handleBlock(place._id)}>unBlock</Button>
                    ) : (
                      <Button className='bg-red-800 hover:scale-110' onClick={() => handleBlock(place._id)}>Block</Button>
                    )}
                  </div>
                  <div onClick={() => handleEdit(place)} className='mt-8 ml-2 w-72 shadow-2xl h-[400px] rounded-xl overflow-hidden card transform transition-transform duration-200 hover:scale-95 hover:shadow-md'>
                    <div className="relative">
                      <img
                        src={place.Image}
                        alt={place.Destrictname}
                        className="object-cover w-full h-48"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                        <p className="text-white text-lg font-bold">{place.State}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p>{place.Destrictname}</p>
                      <p>{place.Description}</p>
                    </div>



                  </div>
                </div>
              ))}
            </div>

          </div>



          <div className="flex items-center my-9 justify-center space-x-4">
            <button className="underline  text-gray-800 rounded-l-md border-r border-gray-100 py-2   px-3" onClick={() => Setpages(page - 1)}>
              <div className="flex flex-row align-middle">
                <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                </svg>
                <p className="ml-2">Prev</p>
              </div>
            </button>
            <span className="text-gray-700">Page: {page}</span>
            <button className="underline  text-gray-800 rounded-r-md py-2 border-l border-gray-200   px-3" onClick={() => Setpages(page + 1)}>
              <div className="flex flex-row align-middle">
                <span className="mr-2">Next</span>
                <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <p className='text-red-700 text-center font-bold'>No places available!</p>
      )}

      <div className=" mt-96">
      </div>
    </>
  )
}

export default Places