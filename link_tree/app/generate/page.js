'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MdDelete, MdEdit, MdFindReplace } from "react-icons/md";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Loader from '../components/StylishLoader'


const Page = () => {
  const [loader, setLoader] = useState(false)
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState(searchParams.get('handle') || '')
  const [links, setLinks] = useState(JSON.parse(searchParams.get('links')) || [{ link: '', linkText: '' }])
  const [pics, setPics] = useState(searchParams.get('pics') || '')

  const handlesubmit = async () => {
    try {
      if (!handle || handle.length < 2 || handle.length > 12) return toast.error("please enter a handle or handle characters between 2 - 12", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (!pics) return toast.error("please enter your pic link", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      let emptyLinks = links.filter(link => link.link === '' || link.linkText === '');
      if (emptyLinks.length > 0) {
        return toast.error("Please fill all the link fields", {
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
      const bittree = { handle, links, pics };
      const res = axios.post('api/add', bittree)
      const data = await res
      let message = (data.data.msg);
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setHandle('');
      setLinks([{ link: '', linkText: '' }]);
      setPics('');
    } catch (error) {
      toast.error(error.response.data.msg, {
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
    finally {
      setLoader(false)
    }
  }

  const handleAdd = () => {
    setLinks([...links, { link: '', linkText: '' }])
  }

  const handleDelete = (index) => {
    if (links.length === 1) {
      toast("You cannot delete the last link", {
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
      return;
    }
    setLinks((initialLinks) => {
      return initialLinks.filter((links, i) => i !== index)
    })
    toast("Link deleted successfully", {
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

  const handleChange = (index, value, type) => {
    setLinks((initialLinks) => {
      return initialLinks.map((links, i) => {
        if (i === index) {
          return { ...links, [type]: value }
        }
        return links;
      })
    })
  }

  const handleEdit = async () => {
    try {

      if (!handle || handle.length < 2 || handle.length > 12) return toast.error("please enter a handle or handle characters between 2 - 12", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      if (!pics) return toast.error("please enter your pic link", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      let emptyLinks = links.filter(link => link.link === '' || link.linkText === '');
      if (emptyLinks.length > 0) {
        return toast.error("Please fill all the link fields", {
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
      const bittree = { handle, links, pics };
      const res = await axios.post('/api/edit', bittree)
      let message = (res.data.msg);
      toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setHandle('');
      setLinks([{ link: '', linkText: '' }]);
      setPics('');
    } catch (error) {
      toast.error(error.response.data.msg, {
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
    finally{
      setLoader(false)
    }
  }

  const handleFetch = async () => {
    try {
      if (!handle || handle.length < 2 || handle.length > 12) return toast.error("please enter a handle or handle characters between 2 - 12", {
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
      setLoader(true)
      const response = await axios.post('api/check', { handle })
      toast.success(response.data.msg, {
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
      if (response.status === 200) {
          setLinks(response.data.data.links)
          setPics(response.data.data.pics)
      }
    }
    catch (er) {
      toast.success(er.response.data.msg, {
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
    finally{
      setLoader(false)
    }
  }




  return (
    <div className='bg-amber-100 grid lg:grid-cols-2'>
      {loader && <Loader />}
      <div className="col1 h-screen w-full flex justify-center items-center">
        <div className='flex flex-col w-full gap-8'>
          <header>
            <div className="logos">
            </div>
            <div>
              <h1 className='text-3xl font-extrabold text-center'>Welcome back</h1>
              <p className='text-center'>Create your Bittree</p>
            </div>
          </header>
          <div className="inputs flex flex-col w-[80%] mx-auto gap-2.5 ">
            <h2>step 1: Claim Your Handle</h2>
            <div className='relative'>
              <input onKeyDown={(e)=> {if(e.key === 'Enter')handleFetch()}} onChange={(e) => setHandle(e.target.value)} value={handle} className='focus:outline-amber-400 w-[96.5%]' name='handle' type="text" placeholder='Choose a Handle' required />
              <div className="absolute right-0 top-[-2]">
                <button onClick={handleFetch} className='bg-gray-800 w-9 h-9 flex justify-center items-center  rounded-full text-amber-50 border-2 border-black hover:border-amber-50 active:border-green-400 disabled:bg-gray-600'><MdFindReplace /></button>
              </div>
            </div>
            <h2>step 2: Add Links</h2>
            <div className="size pr-3 h-[calc(100vh-550px)] w-full flex flex-col gap-2.5 bg-[rgba(0,0,0,0.1)] overflow-y-auto border border-gray-500 p-2 rounded-md no-scrollbar">
              {
                links.map((item, index) => (
                  <div key={index} className="links w-full flex">
                    <input onChange={(e) => handleChange(index, e.target.value, 'link')} value={item.link || ""} className='focus:outline-amber-400 w-full' name='link' type="text" placeholder='Enter Link' />
                    <input onChange={(e) => handleChange(index, e.target.value, 'linkText')} value={item.linkText || ''} className=' focus:outline-amber-400 w-1/2' name='linkText' type="text" placeholder='Enter Link Text' />
                    <button onClick={() => handleDelete(index)} className='p-3 ml-2 border bg-black rounded-full'><MdDelete className='invert' /></button>
                  </div>
                ))
              }
            </div>
            <button onClick={handleAdd} className='bg-gray-800 ml-4 rounded-2xl py-1 text-amber-50 border-2 hover:border-gray-700 active:border-red-400'>Add Links</button>
            <h2>step 2: Add Picture And Finalize</h2>
            <input onKeyDown={(e) => { if (e.key === 'Enter') { return handlesubmit() } }
            } onChange={(e) => setPics(e.target.value)} value={pics} name='pics' type="text" className=' focus:outline-amber-400' placeholder='Create Your Bittree' />
            <div className='flex'>
              <button disabled={!pics || !handle || !links[0].linkText || !links[0].link} onClick={handlesubmit} className='bg-gray-800 ml-4 rounded-2xl py-1 text-amber-50 border-2 hover:border-gray-700 active:border-green-400 disabled:bg-gray-600 w-full'>Create Your Bittree</button>
              <button disabled={!pics || !handle || !links[0].linkText || !links[0].link} onClick={() => handleEdit(handle)} className='bg-gray-800 w-8 h-8 flex justify-center items-center  rounded-full text-amber-50 border-2 hover:border-gray-700 active:border-green-400 disabled:bg-gray-600'><MdEdit /></button>
            </div>
          </div>
        </div>

      </div>
      <div className="col2 h-screen w-full hidden lg:block">
        <img className='object-center object-cover w-full h-full' src="/banner-login.webp" alt="" />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}

export default Page


