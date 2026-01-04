import React from 'react'

const StylishLoader = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full  opacity-100 z-10 flex items-center justify-center">
        <div className="loader1 absolute h-25 w-25 flex items-center justify-center  rounded-full  border-8 border-amber-600 border-x-[rgba(0,0,0,0.0)]">
        </div>
        <div className="loader2 absolute loader3 flex items-center justify-center w-20 h-20  rounded-full border-8 border-green-500 border-y-[rgba(0,0,0,0.0)]">
          </div>
          <div className="loader3 absolute flex items-center justify-center w-15 h-15 rounded-full border-8 border-red-100 border-x-[rgba(0,0,0,0.0)]">
          </div>
          <div className="loader4 absolute flex items-center justify-center   bg-blue-900 h-4 w-8 ">
          </div>
      </div>
  )
}

export default StylishLoader