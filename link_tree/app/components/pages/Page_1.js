'use client'
import { Poppins } from "next/font/google";
import Image from "next/image";
import { poppins } from "../../layout";
import { useRef, useState, useEffect } from "react";
import styles from '../../../Carousel.module.css'
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import  Loader from '../CircleLoader'
export default function Page() {

  const [images, setImages] = useState([])
  const [next, setNext] = useState(0)
  const [animation, setAnimation] = useState(true)
  const [text, setText] = useState('linktr.ee/')
  const [loader, setLoader] = useState(false)
  const imgs = useRef([])
  const scroll = useRef();
  const router = useRouter();
  const createTree = () => {
    let link;

    if (text.includes('linktr.ee/')) {
      link = text.split('linktr.ee/')[1];
    }
    else{
      link = text;
    }

    if (!link || link.length < 2 || link.length > 12) {
      toast.error("Please enter a valid handle between 2 - 12 characters");
      return;
    }

    if (link.includes(' ')) {
      toast.error("Handle cannot contain spaces");
      return;
    }
    setLoader(true);
    setTimeout(() => {
      router.push(`/generate?handle=${link}`);
      setLoader(false);
    }, 1500);
  };



  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch('api/imgs', { signal: controller.signal });
        const data = await res.json();
        setImages(data.data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        console.error(err);
      }
    }

    load();

    return () => {
      controller.abort();
    };
  }, []);

  function animate() {
    if (!animation) return
    const container = scroll.current;
    const el = imgs.current[next];
    if (!el || !container) return;
    container.scrollTo({
      top: el.offsetTop - 65,
      left: el.offsetLeft - 10,
      behavior: 'smooth',
    });
  }


  useEffect(() => {
    if (images.length === 0) return;
    if (!animation) return;
    const id = setInterval(() => {
      setNext(next => (next + 1) % images.length);
    }, 2000);
    return () => clearInterval(id);

  }, [images, animation]);


  useEffect(() => {
    animate()
  }, [next]);

  return (
    <main className="relative">
      {loader && <Loader/>}
      <section className={`flex flex-col h-[70dvh] bg-amber-500 border-2 w-[100vw] ${loader ? 'opacity-50 pointer-events-none' : ''} md:flex-row`}>
        <div className="col_1 h-full  flex items-center p-2 bg-amber-200">
          <div className="pt-24 flex flex-col gap-2.5">
            <h2 className={`${poppins.className} text-center text-xl`}>A link in bio built for you.</h2>
            <p className="view text-[14px] px-3.5">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
            <div className="flex justify-center gap-2">
              <input onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  createTree()
                }
              }} onChange={e => setText(e.target.value)} type="text" className="w-1/2 border-2 rounded bg-amber-100 px-2 text-amber-100 placeholder-amber-100 focus:outline-green-400 border-amber-200" placeholder="linktr.ee/your-url" value={text} />
              <div className="btn w-[130px] h-[30px] flex items-center">
                <button onClick={() => createTree()} className="text-[14px] border-2  bg-blue-500 text-amber-50 border-gray-700 w-[127px] h-[30px] hover:w-[129px] hover:h-[31px] active:border-amber-300 rounded">Get started for free</button>
              </div>
            </div>
          </div>
        </div>
        <div onMouseLeave={() => setAnimation(true)} className="col_2 overflow-hidden border-2 border-blue-500">
          <div ref={scroll} onMouseEnter={() => setAnimation(false)} className={`imgs flex h-full flex-row gap-2 px-3 overflow-auto ${styles.scrollbar}`}>
            {images.map((el, index) => (
              <img className="img border-2 border-amber-700"
                key={index}
                onMouseEnter={() => {
                  setNext(index)
                  setAnimation(false)
                }}
                ref={(el) => (imgs.current[index] = el)}
                src={`/images/${el}`}
                alt={el}
              />
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}
