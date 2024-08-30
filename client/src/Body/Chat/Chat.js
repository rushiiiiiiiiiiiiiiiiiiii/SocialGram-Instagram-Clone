import React, {useEffect, useState } from 'react'
import { RiMessage2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
const Chat = () => {
  const [name, setName] = useState()
  const [uname, setUame] = useState()

  const userid = sessionStorage.getItem("userid")
  const showpost = ()=>{
    axios.get("http://127.0.0.1:8000/getuser/"+ userid)
    .then(res=>{
        setName(res.data[0].name)
        setUame(res.data[0].username)
    })
    .catch(err=>console.log(err))
}
useEffect(()=>{
    showpost()

},[userid])
  return (
     
    <div className=' w-72  md:fixed md:block hidden h-full -ml-[230px] border-l-2 border-gray pl-4'>
      <div className="acc flex rounded-xl mt-5 h-14 w-60 items-center justify-around">
            <div className="prof w-10 h-10 mx-5 ">
              <Link to={`/prof/${sessionStorage.getItem("userid")}}`}><img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' /></Link>
            </div>
            <div className="det mr-10">
              <h1 className='font-semibold'>{name}</h1>
              <Link to={`/prof/${sessionStorage.getItem("userid")}`}><a className='text-gray-500 text-sm'>@{uname}</a></Link>
            </div>
          </div>
      <div className='flex mt-3'>
        <h1 className='ml-5 font-semibold'>Message</h1>
        <p className='ml-40 text-[18px] font-bold mt-1'><RiMessage2Line/></p>
      </div>
      <input type="text" placeholder='Search Message...' className='bg-loww mt-3 px-10 py-[9px] border-hidden overflow-hidden ml-3 rounded-xl'/>
      
      <div className='mt-3'>
        <div className='flex gap-2 text-center ml-4 font-semibold border-b-2 cursor-pointer border-gray-500 w-64 pb-1'>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>Primary</h1>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>General</h1>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>Request</h1>
        </div>
        <div className="msg mt- ml- mr- cursor-pointer">
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div className=''>
          <h1 className='font-medium'>Aman Dubey</h1>
          <p className='text-sm '>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Ram Dalvi</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Sahil Chavan</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Akshay Pawar</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Kiran Kadam</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Ajit Gawade</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
        <div className="prof-mmsg flex gap-8  py-2 ml hover:bg-indigo-500 rounded-bl-xl rounded-br-xl">
          <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]'/>
          <div>
          <h1 className='font-medium'>Ankit Chavan</h1>
          <p className='text-sm'>4 new messages</p>
          </div>
        </div>
      </div>
      </div>
    
     </div>
  )
}

export default Chat