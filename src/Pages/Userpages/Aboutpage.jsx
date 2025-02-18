import React, { useEffect, useState } from 'react';
import { FetchCategory, fetchpackagesabout, fetchrating, } from '../../Api/Userapi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Aboutpage() {


    const [packages, setpackages] = useState([])
    const [categories, setCategories] = useState([]);
    const [review, setreview] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchpackagesabout();
                setpackages(response.data.fullpackage)

                // Fetch categories
                const categoriesResponse = await FetchCategory();
                setCategories(categoriesResponse.data.packagescat);


                const Reviews = await fetchrating()
                if (Reviews?.data?.packageRatings) {
                    setreview(Reviews.data.packageRatings);
                }



            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();

    }, [review])


    let averageRating

    return (
        <>
            <div className="w-screen h-screen overflow-x-hidden ">
                <div className="flex flex-row w-full h-90">
                    <div className="w-1/2 sm:content lg:w-1/2 mr-4 p-7 pl-7 mt-16 ml-12 h-[100%] rounded-2xl bg-pink-200 shadow shadow-violet-900">
                        <h3 className="text-[#ffffff] ml-2 font-prompt-semibold text-2xl">
                            About Us ussss
                        </h3>
                        <h1 className="text-sm sm:text-4xl lg:text-5xl font-serif">
                            <span className="text-white">
                                <span className="text-black">Welcome to Travelgo,</span> your trusted platform for discovering and booking the best travel packages in your state!
                            </span>
                            {/* <br /> */}
                            {/* <span className="text-[#ffffff] block mt-7 ">
                                lllll
                            </span> */}
                            {/* <span className="text-[#000000] block mt-4 ">uuuu</span> */}
                        </h1>
                    </div>

                    <div className="w-1/2 sm:content lg:w-1/2 mr-4 p-7 pl-7 mt-16 ml-12 h-[100%] rounded-2xl bg-pink-200 shadow shadow-violet-900">
                        <h1 className="text-sm sm:text-4xl lg:text-4xl font-serif">
                            <span className="text-white">
                                <span className="text-black">We believe that travel should be easy, affordable, and tailored to your preferences. Whether you’re looking for a weekend getaway, an adventure trip, or a luxury vacation,
                                </span> we bring you carefully curated travel packages designed to suit every traveler’s needs.
                            </span>

                        </h1>
                    </div>




                </div>

                <div className="flex flex-col items-center justify-center p-28">
                    <h1 className="text-center mb-10 mt-2 font-prompt text-3xl">
                        Explore packages
                    </h1>
                    <div className="flex flex-col sm:flex lg:flex-row gap-8">
                        {/* Ensure this is a flex-row container */}
                        <div className="flex flex-row justify-center gap-10 flex-wrap">
                            {packages.map((pk) => (
                                <div key={pk._id} className="w-64 h-80 shadow  rounded-2xl shadow-lg shadow-gray-400 border-2 border-gray-400 rounded-lg overflow-hidden card transform transition-transform duration-200 hover:scale-105 hover:shadow-md">
                                    <img
                                        src={pk.Image[0]}
                                        alt={pk.Destrictname}
                                        className="object-cover w-full h-40"
                                    />
                                    <h1 className="text-center text-2xl font-semibold font-prompt">
                                        {pk.category}
                                    </h1>
                                    <div className="flex flex-row p-4">
                                        <p className="ml-1 mb-2 text-base">{pk.Destrictname}</p>
                                    </div>
                                    <div key={pk.packageId} className="p-4">
                                        <p className="mr-1 mt-4 mb-2 text-yellow-800">
                                            <FontAwesomeIcon icon={faStar} /> Ratings: {pk.averageRating || "0"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Aboutpage
