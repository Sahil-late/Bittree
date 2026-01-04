import React from 'react'

function Loader() {
  return (
    <div className="absolute top-0 left-0 w-full h-full  opacity-100 z-10 flex items-center justify-center">
        <div className="loader relative h-25 w-25 flex items-center justify-center  rounded-full ">
          <div className="absolute h-4 w-4 bg-red-600 rounded-full top-0"></div>
          <div className="absolute h-4 w-4 bg-red-600 rounded-full right-0"></div>
          <div className="absolute h-4 w-4 bg-red-600 rounded-full bottom-0"></div>
          <div className="absolute h-4 w-4 bg-red-600 rounded-full left-0"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full top-[15px] left-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full top-[15px] right-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-100 rounded-full bottom-[15px] left-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full bottom-[15px] right-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full top-[15px] left-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full top-[15px] right-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full bottom-[15px] left-[15px]"></div>
          <div className="absolute h-4 w-4 bg-blue-600 rounded-full bottom-[15px] right-[15px]"></div>
        </div>
      </div>
  )
}

export default Loader
