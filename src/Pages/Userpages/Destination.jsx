import React from 'react'

function Destination() {




  return (
    <>
  <br></br>
      <div class="grid grid-cols-1 ">
        <div class=" text-3xl font-semibold text-right text-gray-700 px-6">Travel to your dream places</div>
      </div>

      <div className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
          <div className="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
            <h1 className="text-3xl my-5">Soft Plushy Cushion Chair</h1>
            <p className="mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, incidunt!</p>
            <h2 className="font-semibold mb-5">$29.99</h2>
          </div>


        </div>
      </div>
      <br></br>
    </>
  )
}

export default Destination
