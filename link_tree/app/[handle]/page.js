'use client'
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import Loader from '../components/CircleLoader'

export default function Page({ params }) {
  const router = useRouter();
  const [data, setData] = useState()
  const [loader, setLoader] = useState(false)
  console.log(data);

  useEffect(() => {
    async function load() {
      try {
        setLoader(true)
        let { handle } = await params
        const response = await axios.post('api/userInfo', { handle })
        const info = response.data.handleExists
        setData(info)
      } catch (error) {
        console.log(error.response.data.msg);
      }
      finally{
        setLoader(false)
      }
    }
    load()
  }, [params])

  const handleDelete = async (handle) => {
    try{
      setLoader(true)
       const response = await axios.post('api/delete', { handle })
       toast(response.data.msg)
       setTimeout(()=>{
        router.push('/generate')
       },1500)
    }catch(e){
      console.log(e);
    }
    finally{
      setLoader(false)
    }
  }


  const handleEdit = () => {
    router.push(`/generate?edit=true&handle=${data.handle}&links=${JSON.stringify(data.links)}&pics=${data.pics}`);
  };



  return <>
    <div className="h-screen bg-gray-800 flex flex-col gap-5 justify-center items-center">
      {loader && <Loader/>}
      <div className="w-fit">
        {data &&
          <div className="text-white border-2  text-center px-10 py-5 rounded-lg bg-[rgba(0,0,0,0.5)]">
            <h1 className="text-3xl ">Welcome {data.handle}</h1>
            <div className=" bg-amber-500 flex justify-center w-35 h-35 mx-auto rounded-full mt-5 overflow-hidden">
              <img className="object-cover w-full h-full" src={data.pics} alt="Avatar" />
            </div>
            {(data.links).map((item) => (
              <div key={item._id} className="mt-2 bg-gray-500 p-1 rounded text-amber-100 hover:bg-gray-600 cursor-pointer">
                <Link href={item.link}>
                  {item.linkText}
                </Link>
              </div>
            ))}
            <div className="flex gap-5 justify-center">
                <button onClick={() => handleDelete(data.handle)} className="rounded-full bg-gray-200 p-1 mt-5 hover:bg-gray-300 cursor-pointer">
                  <MdDelete className="text-3xl  invert" />
                </button>
              <button onClick={() => handleEdit()} className="rounded-full bg-gray-200 p-1 mt-5 hover:bg-gray-300 cursor-pointer">
                <MdEdit className="text-3xl  invert" />
              </button>
            </div>
          </div>
        }
      </div>

      <button onClick={() => router.push('/generate')} className='border-2 px-3 py-1 rounded-xl bg-gray-200  hover:bg-gray-300 cursor-pointer'>Back To Generate</button>
    </div>
    <ToastContainer/>
  </>
}