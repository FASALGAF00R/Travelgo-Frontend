import React, { useEffect, useState } from 'react'
import { FetchCategory } from '../../Api/Userapi';
import Packagespage from './Packagespage';




function Filterpackage() {

  const [category, setCategory] = useState([])
  const [categoryType, setcategoryType] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [searchactivity, setSearchactivity] = useState(0);
  const [loadData, SetLoadData] = useState([])


console.log(category,"category");

  useEffect(() => {
    const getCat = async () => {
      try {
        const res = await FetchCategory()
        console.log(res, "res");
        if (res.data.packagescat) {
            setCategory(res.data.packagescat);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCat()
  }, [])


  const handleTypeChange = (e) => {
    e.preventDefault()
    const selectedValue = e.target.value

    setcategoryType(selectedValue)
  }



    return (
        <>
            <div className=' sm:hidden flex justify-center mr-5'>
                <div className='w-[20rem] h-[28rem] mt-20  bg-black  rounded-2xl '>
                    <div className='p-6 mt-2 gap-1'>
                        <h1 className='text-white font-league-spartan text-lg font-bold flex justify-between'>
                            Find Your Package
                        </h1>
                    </div>

                    <div className='ml-6 flex flex-col w-[80%]'>
                        <label className='text-white font-jura'>category Type</label>
                        <select
                            value={categoryType}
                            onChange={handleTypeChange}
                            className='mt-4 h-8 rounded-lg '
                        >
                            <option value="null"  >Select category Type</option>
                            {category.map((data, index) => (
                <option key={index} value={data.Name}>{data.Name}</option>
              ))}
                        </select>
                    </div>
                    <div className='ml-6 flex flex-col w-[85%] mt-2'>
                        <label className='text-white font-jura'>Search By activity</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                e.target.value.length !== 0
                                    ? setSearchactivity(e.target.value)
                                    : setSearchactivity(0);
                            }}
                            className='mt-4 h-8 rounded-lg p-2'
                            placeholder='Search By activity'
                        />
                    </div>
                    <div className='ml-6 flex flex-col mt-2'>
                        <label className='text-white font-jura'>Budget</label>
                        <section className='flex flex-row gap-2'>
                            <input
                                type="text"
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className='mt-4 h-8 w-28 rounded-lg p-2'
                                placeholder='Minimum'
                            />
                            <span className='text-white mt-5'>to</span>
                            <input
                                type="text"
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className='mt-4 h-8 w-28 rounded-lg p-2'
                                placeholder='Maximum'
                            />
                        </section>

                    </div>
                </div>
            </div>

            {loadData ? (

                <div className=' flex flex-wrap mt-16'>

                    <div className='w-[85%] sm:mt-[29rem] lg:h-auto h-full ml-4 lg:mt-8 rounded-2xl p-2 '>
                         <Packagespage categoryType={categoryType}  priceRange={priceRange} searchactivity={searchactivity} /> 
                    </div>
                    <div className=' w-full sm:w-[28%] h-[27rem] mt-2 ml-[65rem] lg:mt-12 mr-10 bg-black  rounded-2xl '>
                        <div className='p-6 mt-2 gap-1'>
                            <h1 className='text-white font-league-spartan text-lg font-bold flex justify-between'>
                                Find Your Property
                            </h1>
                        </div>

                        <div className='ml-6 flex flex-col w-[85%]'>
                            <label className='text-white font-jura'>Property Type</label>
                            <select
                                value={categoryType}
                                onChange={handleTypeChange}
                                className='mt-4 h-8 rounded-lg'
                            >
                                <option value="null"  >Select Property Type</option>
                                {category.map((data, index) => (
          <option key={index} value={data.Name}>{data.Name}</option>
        ))}
                            </select>
                        </div>
                        <div className='ml-6 flex flex-col w-[85%] mt-2'>
                            <label className='text-white font-jura'>Search By Title</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    e.target.value.length !== 0
                                        ? setSearchTitle(e.target.value)
                                        : setSearchTitle(0);
                                }}
                                className='mt-4 h-8 rounded-lg p-2'
                                placeholder='Search By Title'
                            />
                        </div>
   
                        <div className='ml-6 flex flex-col mt-2'>
                            <label className='text-white font-jura'>Budget</label>
                            <section className='flex flex-row gap-2'>
                                <input
                                    type="text"
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className='mt-4 h-8 w-28 rounded-lg p-2'
                                    placeholder='Minimum'
                                />
                                <span className='text-white mt-5'>to</span>
                                <input
                                    type="text"
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className='mt-4 h-8 w-28 rounded-lg p-2'
                                    placeholder='Maximum'
                                />
                            </section>

                        </div>

                    </div>
                </div>
            ) : (
                <div>
                    <h1>Property is empty</h1>
                </div>
            )}

        </>
    )
}

export default Filterpackage
