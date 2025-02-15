import React from 'react'

function Aboutpage() {
    return (
        <>
            <div className="w-screen h-screen overflow-x-hidden ">
                <div className="flex flex-row w-full h-80">
                      <div className="w-1/2 sm:content lg:w-1/2 mr-4 p-7 pl-7 mt-16 ml-12 h-[100%] rounded-2xl bg-pink-200 shadow shadow-violet-900">
                        <h3 className="text-[#ffffff] ml-2 font-prompt-semibold">
                            ttttttt
                        </h3>
                        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-prompt-lrlight">
                            <span className="text-[#af4677]">
                                <span className="text-black">ggfg</span>gg
                            </span>
                            <br />
                            <span className="text-[#ffffff] block mt-7 ">
                                lllll
                            </span>
                            <span className="text-[#000000] block mt-4 ">uuuu</span>
                        </h1>
                    </div>

                    <div className="w-1/2 sm:content lg:w-1/2 mr-4 p-7 pl-7 mt-16 ml-12 h-[100%] rounded-2xl bg-pink-200 shadow shadow-violet-900">
                        <h3 className="text-[#ffffff] ml-2 font-prompt-semibold">
                            ttttttt
                        </h3>
                        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-prompt-lrlight">
                            <span className="text-[#af4677]">
                                <span className="text-black">ggfg</span>gg
                            </span>
                            <br />
                            <span className="text-[#ffffff] block mt-7 ">
                                lllll
                            </span>
                            <span className="text-[#000000] block mt-4 ">uuuu</span>
                        </h1>
                    </div>




                </div>
                <div className="flex flex-col items-center justify-center p-28">
                    <h1 className="text-center mb-10 mt-2 font-prompt text-3xl">
                        Explore packages
                    </h1>
                    <div className="flex flex-col sm:flex lg:flex-row gap-8">
                

                        <div className="flex flex-wrap justify-center gap-10 ">
                            <div className="w-64 h-80  shadow bg-pink-200 rounded-2xl">
                                <img
                                    className="p-3 pr-4 h-[75%] ml-2 justify-center items-center"
                                    //   src={photoshop}
                                    alt=""
                                />
                                <h1 className="text-center text-2xl font-prompt-semibold font-prompt">
                                    {/* {category[2]} */}
                                </h1>
                                <div className="flex flex-row p-4">
                                    {/* <img className="w-4 h-4 mt-1" src={course} alt="" /> */}
                                    <p className="ml-1 mb-2 text-base">jjjj</p>
                                    {/* <img className="w-3 h-4 mt-1 ml-8" src={Instructors} alt="" /> */}
                                    <p className=" mb-2 text-base">jjj</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Aboutpage
