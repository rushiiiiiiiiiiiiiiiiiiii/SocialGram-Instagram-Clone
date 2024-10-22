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

    <div className=' w-72   md:block hidden h-full text-black   pl-4'>
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
      <div className=' mt-7 h-[500px] w-[310px] -ml-1'>
        <div className='flex items-center justify-between '>
          <h1 className='text-gray-500 font-semibold text-[14px] ml-2'>Suggested for you</h1>
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
 