'use client'
import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, Bounce, ToastContainer } from 'react-toastify';
import Loader from '../components/StylishLoader'
import Link from 'next/link'


const Page = () => {
    const router = useRouter()
    const [handle, setHandle] = useState('')
    const [loader, setLoader] = useState(false)
    const handleCheck = async (handle) => {
        try {
            if (handle.length < 2) {
                return toast.error("Handle must be at least 2 characters long", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            }
            setLoader(true)
            const response = await axios.post('api/check', { handle })
            if (response.data.msg === 'Bittree foundded') {
                router.push(`/${handle}`)
            }
            setHandle('')
            return toast.success("Bittree found! Redirecting...", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } catch (er) {
            const message = er.response.data.msg
            if (message) return toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            else console.log(er);
        }
        finally {
            setLoader(false)
        }
    }
    return (
        <div className='relative h-screen bg-gray-950 w-screen text-amber-100 flex items-center justify-center'>
            {loader && <Loader />}
            <div className='flex sm:w-1/2 w-[90vw] flex-col items-center gap-5' >
                <input onKeyDown={(e) => { if (e.key === 'Enter') handleCheck(handle) }} type="text" onChange={e => setHandle(e.target.value)} value={handle} className='border w-full' placeholder='Enter Handle Name' />
                <button onClick={() => handleCheck(handle)} className='text-blue-900 border-2  text-center px-1 rounded-lg bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.9)]  active:border-amber-700 cursor-pointer'>Check</button>
            </div>
            <ToastContainer />
            <div className='absolute bottom-7.5'>
                <Link href={'/generate'}>
                    <button className='invert  bg-gray-800 p-2 flex justify-center items-center  rounded-full text-amber-50 border-3 border-white hover:border-amber-700 active:border-red-400 disabled:bg-gray-900'>Back To Genrate</button>
                </Link>
            </div>
        </div>
    )
}

export default Page