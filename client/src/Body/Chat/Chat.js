import React, { useEffect, useState } from 'react'
import { RiMessage2Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Chat = () => {
  const [name, setName] = useState()
  const [uname, setUame] = useState()
  const [file, setFile] = useState()
  const [user, setUser] = useState([])
  const nav=useNavigate()

  const userid = sessionStorage.getItem("userid")
  const showpost = () => {
    axios.get("http://127.0.0.1:8000/getuser/" + userid)
      .then(res => {
        setName(res.data[0].name)
        setUame(res.data[0].username)
        setFile(res.data[0].photos)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    showpost()

  }, [userid])
  const showallluser = () => {
    axios.get("http://127.0.0.1:8000/chatuser/"+ userid)
      .then(res => {
        setUser(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    showallluser()

  }, [])
  const logout=async()=>{
    const data=await fetch("http://127.0.0.1:8000/logout/"+sessionStorage.getItem('userid'),{
      method:"post"
    })
    console.log(data)
    sessionStorage.removeItem('userid')
    nav('/login')
  }
  return (

    <div className=' w-72   md:block hidden h-full text-black  border-l border-gray pl-4'>
      <div className="acc flex rounded-xl mt-5 h-14 w-[300px] items-center justify-between ">
        <div className='flex -ml-5'>
          <div className="prof  w-11 h-11 mx-5   ">
          <Link to={`/prof/${sessionStorage.getItem("userid")}}`}><img src={`http://127.0.0.1:8000/uploads/${file}`} alt="" className='mt-1 h-10 w-10 rounded-3xl cursor-pointer' /></Link>
        </div>
        <div className="det w-40 -ml-2">
          <h1 className='font-semibold text-[15px] '>{name}</h1>
          <Link to={`/prof/${sessionStorage.getItem("userid")}`}><a className='text-gray-500  text-sm'>@{uname}</a></Link>
        </div>
        </div>
        <div>
          <h1 className='text-[12px] font-medium mr-2 text-blue-500 cursor-pointer  hover:text-blue-300' onClick={logout}>LogOut</h1>
        </div>
      </div>
      <div className=' mt-8 h-[500px] w-[310px] -ml-1'>
        <div className='flex items-center justify-between '>
          <h1 className='text-gray-500 font-semibold text-[15px] ml-2'>Suggested for you</h1>
          <p className='text-[13px] mr-2 font-medium'>See All</p>
        </div>
        <div className='mt-2'>
          {
             user.slice().reverse().map((data,i)=>(
        <div className=' ml-2' key={i}>
          <div className='flex h-[58px] items-center justify-between'>
            <div className='flex -ml'>
            <Link  to={`/prof/${data.id}`}><img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='h-10 w-10 rounded-full mt-1'/></Link>
            <div className='ml-4 mt-[2px]'>
            <Link  to={`/prof/${data.id}`}> <h1 className='font-semibold text-[14px]'>{data.name}</h1></Link>
              <p className='text-gray-500 text-[12px]'>Followed by rushi_07</p>
            </div>
            </div>
            <div>
            <button className=' text-[12px] font-medium mr-3 text-blue-500'>Follow</button>
            </div>
          </div>
        </div>
             ))
        }
        </div>
      </div>

    </div>
  )
}

export default Chat
 {/* <h1 className='ml-5 font-semibold'>Message</h1>
        <p className='ml-40 text-[18px] font-bold mt-1'><RiMessage2Line /></p>
      </div>
      <input type="text" placeholder='Search Message...' className='bg-loww mt-3 px-10 py-[9px] border-hidden overflow-hidden ml-3 rounded-xl' />

      <div className='mt-3'>
        <div className='flex gap-2 text-center ml-4 font-semibold border-b-2 cursor-pointer border-gray-500 w-64 pb-1'>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>Primary</h1>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>General</h1>
          <h1 className='hover:border-b-2 hover:border-indigo-500 hover:w-40 text-center w-40 hover:text-indigo-500'>Request</h1>
        </div>
        <div className="msg mt- ml- mr- cursor-pointer">
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div className=''>
              <h1 className='font-medium'>Aman Dubey</h1>
              <p className='text-sm '>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Ram Dalvi</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Sahil Chavan</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Akshay Pawar</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Kiran Kadam</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8 py-2 ml hover:bg-indigo-500 ">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Ajit Gawade</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
          <div className="prof-mmsg flex gap-8  py-2 ml hover:bg-indigo-500 rounded-bl-xl rounded-br-xl">
            <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-5 mt-[2px]' />
            <div>
              <h1 className='font-medium'>Ankit Chavan</h1>
              <p className='text-sm'>4 new messages</p>
            </div>
          </div>
       */}