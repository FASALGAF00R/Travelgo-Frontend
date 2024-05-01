import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchpackages, FetchCategory, fetchpackagescat } from '../../Api/Userapi';
import Background from '../../../src/Assests/Images/mountain-6968913_1280.jpg'
import { MdCardTravel } from "react-icons/md";
import Select from "react-select";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


function Packagespage() {





  const navigate = useNavigate()
  const location = useLocation()
  const placeId = location.state
  console.log(placeId, "placeId");
  const [packages, setpackages] = useState([])
  const [sortedPackages, setSortedPackages] = useState([]);
  const [sortBy, setSortBy] = useState('lowToHigh');
  const [categories, setCategories] = useState([]);
  const [noPackages, setNoPackages] = useState(false); 
  const [priceFilter, setPiceFilter] = useState([1000, 100000]);








  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchpackages(placeId);
        console.log(response, "response");
        const filteredPackages = response.data.fullpackage.filter(pk => pk.isBlock === true);
        setpackages(filteredPackages);
        sortPackages(filteredPackages, sortBy);

        // Fetch categories
        const categoriesResponse = await FetchCategory();
        setCategories(categoriesResponse.data.packagescat);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);




  const sortPackages = (pkgs, sortBy) => {
    const sorted = [...pkgs];
    sorted.sort((a, b) => {
      if (sortBy === 'lowToHigh') {
        return a.amount - b.amount;
      } else if (sortBy === 'highToLow') {
        return b.amount - a.amount;
      }
    });
    setSortedPackages(sorted);
  };


  const handleSortChange = (selectedOption) => {
    const sortByValue = selectedOption.value;
    setSortBy(sortByValue);
    sortPackages(packages, sortByValue);
  };



  const handleCategoryChange = async (selectedOption) => {
    const categoryname = selectedOption.label;
    console.log(categoryname, "categoryname");
    try {
      const response = await fetchpackagescat(placeId, categoryname);
      const filteredPackages = response.data.packagesInCategory.filter(pk => pk.isBlock === true);
      if (filteredPackages.length === 0) {
        setNoPackages(true);
      } else {
        setNoPackages(false);
        setpackages(filteredPackages);
        sortPackages(filteredPackages, sortBy);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };


  const handleclick = (id) => {
    console.log(id, "id");
    navigate('/packagedetails', { state: id })

  }


  const handlePriceRangeChange = (value) => {
    setPiceFilter(value); // Corrected typo
    const [minPrice, maxPrice] = value;
    const filteredPackages = packages.filter(pk => pk.amount >= minPrice && pk.amount <= maxPrice);
    setSortedPackages(filteredPackages);
  };
  




  return (
    <>

      <div className='w-full h-screen relative'>
        <h3 className='absolute font-mono text-white text-8xl w-[80%] py-40 text-end animate-pulse'>PICK <span className='text-gray-800'>THE </span > BEST <span >PACK</span><span className='text-gray-800'>AGES </span> </h3>
        <img className='h-full w-full' src={Background} alt="backgroundimage" />
        <svg className="absolute animate-bounce w-12 h-16 bottom-0 left-1/2 transform -translate-x-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>



      <h1 className='mt-8 font-bold text-center text-4xl text-gray-800'> Packages in {packages.length > 0 ? packages[0].Destrictname : '...'}</h1>
      {packages.length === 0 && <p className="text-center text-red-500 mt-4">Sorry, there are no packages available for this location.</p>}


      <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-4 mb-10 gap-10">
        <div className="w-full md:w-1/3">
          <div className="mb-2 ml-4">Price Range: ₹{priceFilter[0]} - ₹{priceFilter[1]}</div>
          <Slider
            min={1000}
            max={100000}
            defaultValue={[1000, 100000]}
            onChange={handlePriceRangeChange}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:items-center">
          <div>
            <div className="mb-2">Categories:</div>
            <Select
              className="border hover:border-gray-400 border-gray-500 rounded-md focus:outline-none focus:shadow-outline"
              options={categories.map(category => ({ value: category._id, label: category.Name }))}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="relative inline-block text-left w-full md:w-52">
            <div className="mb-2">Price Sort:</div>
            <Select
              className="border hover:border-gray-400 border-gray-500 rounded-md focus:outline-none focus:shadow-outline"
              options={[
                { value: 'highToLow', label: 'Price: Low to High' },
                { value: 'lowToHigh', label: 'Price: High to Low' }
              ]}
              onChange={handleSortChange}
              defaultValue={{ value: 'lowToHigh', label: 'Price: Low to High' }}
            />
          </div>
        </div>
      </div>


      {noPackages ? (
        <p className="text-center text-red-500 mt-4">Sorry, there are no packages available for this category.</p>
      ) : (
        <div className=" mb-10 px-16 h-fit mt-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedPackages.map((pk) => (
            <div key={pk._id} className="shadow-lg shadow-gray-400 border-2  border-gray-400 rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
              <img
                src={pk.Image[0]}
                alt={pk.Destrictname}
                className="object-cover w-full h-40"
              />
              <div>
                <div className=''>
                  <h1 className='capitalize pl-5  text-xl'><strong>{pk.Destrictname}</strong></h1>
                  <div className='flex justify-between mr-10'>
                    <h1 className='capitalize pl-5 '>{pk.State}</h1>
                    <span span className=''><MdCardTravel />   </span>
                  </div>

                </div>

                <div className=' flex justify-between p-3 flex-row'>
                  <h1 className='capitalize pl-5  text-xl'><strong>₹{pk.amount}</strong></h1>
                  <button onClick={() => handleclick(pk._id)}
                    className='bg-white border-2  border-[#3e3e3e] p-2 rounded-sm hover:bg-gray-800 hover:text-white'
                  >View Package
                  </button>
                </div>
                <br />
              </div>
            </div>
          ))}

        </div>
      )}



    </>
  )
}

export default Packagespage
