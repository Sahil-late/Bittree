/* eslint-disable react-hooks/purity */
'use client'
import React from 'react'
import Image from 'next/image';
import { useState,useEffect } from 'react';
import { IoMenu } from "react-icons/io5";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter()
  const pathname = usePathname();
  const [color, setColor] = useState(true)
  const [content, setContent] = useState(false)  
  const showNavbar = ["/","/generate"].includes(pathname);

  useEffect(() => {
      setColor(true)
    }, [content,showNavbar])

  const bg = () => {
    if (!color) return
    setTimeout(() => {
      setColor(false)
    }, 500)
    const r = Math.floor(1 + Math.random() * 255)
    const g = Math.floor(1 + Math.random() * 255)
    const b = Math.floor(1 + Math.random() * 255)
    const a = Math.random()
    const transp = a.toFixed(1)
    return `rgba(${r},${g},${b},${transp})`
  }
  const handleColor = () => {
    setColor(true)
  }


  return (
    <>
    {showNavbar &&
    <div className='flex justify-center'>
      <nav className="bg-[rgba(255,255,255,0.6)] h-16 flex items-center px-4 shadow-md rounded-2xl border-2 justify-between w-[90vw] fixed top-10 z-1">
        <div className="left">
          <Link href={`/`}>
          <div className="logo"> 
            <Image className='logoImg h-[75px]' height={75} width={75} src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="logo" />
          </div>
          </Link>
          
        </div>
        <div className="right flex w-[50%] justify-end gap-2.5">
          <div className="btns h-10 w-50 rounded flex items-center">
            <div className="bt-1 w-15">
              <button className="bg-[rgba(172,170,170,0.5)] text-black rounded-xl h-8 w-14 hover:h-8.5 hover:w-15 border-2 active:border-amber-50 border-gray-500">Login</button>
            </div>
            <div className="bt-2 w-21">
              <button className="bg-green-400 rounded h-8 w-30 hover:h-8.5 hover:w-31 border-2 border-green-800 active:border-amber-50">Sign Up Free</button>
            </div>
          </div>
          <div onMouseEnter={()=>setContent(true)} onClick={() => setContent((change) => !change)} className="menu">
            <IoMenu className='w-8 h-full' />
          </div>
        </div>
        {content &&
          <div onMouseLeave={()=>setContent(false)} className="buttons w-[75%] fixed right-5 top-30 bg-[rgba(255,255,255,0.9)] rounded-2xl  border text-center overflow-hidden">
            <div>
              <div className='grid grid-cols-3'>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Home</button>
                </div>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Templates</button>
                </div>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button onClick={()=> router.push('/handlePage')} className="w-full">Handle</button>
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Discover</button>
                </div>
                <div style={{ backgroundColor: `${bg()}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onMouseEnter={handleColor} onClick={handleColor} className="border h-[21px] w-[21px]  rounded-xl bg-[rgb(233,8,173)] flex items-center justify-center" >+</button>
                </div>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Pricing</button>
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Learn</button>
                </div>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">SignUp</button>
                </div>
                <div style={{ backgroundColor: `${bg()}` }}>
                  <button className="w-full">Login</button>
                </div>
              </div>
            </div>
          </div>
        }
      </nav>
      </div>
}
    </>
  )
}

export default Navbar
