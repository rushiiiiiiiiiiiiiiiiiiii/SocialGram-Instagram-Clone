import React, {useEffect, useRef, useState} from 'react'

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { FaBars, FaRegBookmark, FaSearch } from "react-icons/fa";
import { FaLevelUpAlt } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";
import Search from '../../Search/Search';
import Searchchat from '../../Searchchat/Searchchat';
import axios from 'axios';
const Nav2 = ({themechange}) => {
  const nav=useNavigate()
  const modalRef = useRef();
  const [shows, setShows] = useState(false)
  const [showschat, setShowschat] = useState(false)
  const show = ()=>{
    setShowschat(false)
    setShows(!shows)

  }

  const showchat =()=>{
    setShows(false)
    setShowschat(!showschat)
  }
  const userid = sessionStorage.getItem("userid")
  const [name, setName] = useState()
  const [uname, setUame] = useState()
  const [file, setFile] = useState()
  const logout=async()=>{
    const data=await fetch("http://127.0.0.1:8000/logout/"+sessionStorage.getItem('userid'),{
      method:"post"
    })
    console.log(data)
    sessionStorage.removeItem('userid')
    nav('/login')
  }
  const showlogin = () => {
      axios.get("http://127.0.0.1:8000/getuser/" + userid)
          .then(res => {
              setName(res.data[0].name)
              setUame(res.data[0].username)
              setFile(res.data[0].photos)
          })
          .catch(err => console.log(err))
  }
  useEffect(() => {
      showlogin()

  }, [userid])


  return (
    <div className='flex'>
    <div className="body flex md:fixed border-r border-gray md:block hidden h-full">
        <div className="nav-comp  md:block mt-6 ">
          <div className="logo font-semibold "><h1 className='text-indigo-500 text-[22px] ml-10'>SOCIAL GRAM</h1></div>

          <div className="nav-items mt-4 ml- rounded-xl w-68 cursor-pointer ">
            <ul className=''>
              <Link to='/home'><li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500  text-2xl'><IoHomeOutline className='mt-1 text-2xl mr-5'/>Home</li></Link>
              <h1 onClick={show} className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FiSearch className='mt- mr-5 text-2xl'/>Search</h1>
              <h1  className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><MdOutlineExplore className='mt- mr-5 text-2xl' />Explore</h1>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FiVideo className='mt- mr-5 text-2xl'/>Reels</li>
              <h1 onClick={showchat}className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><RiMessage2Line className='mt mr-5 text-2xl'/>Message</h1>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaRegHeart className='mt- mr-5 text-2xl'/>Notification</li>
              <Link to={`/create/${sessionStorage.getItem("userid")}`}><li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaRegSquarePlus className='mt- mr-5 text-2xl'/>Create</li></Link>
              <Link to={`/prof/${sessionStorage.getItem("userid")}`}><li className='py-4 flex  pl-9 w-60 text-[16px] font-semibold hover:bg-indigo-500 '><img src={`http://127.0.0.1:8000/uploads/${file}`} className=' rounded-3xl cursor-pointer w-8 h-8 mr-5'/>Profile</li></Link>
            </ul>
          </div>
          <div onClick={themechange} className="btn2 mt-7 flex ml-[43px] mb-5">
            <h1 className='flex font-semibold cursor-pointer' onClick={logout}><FaBars className='mr-4 mt text-2xl cursor-pointer'/> Logout</h1>
          </div>

        </div>
        <div className="post"></div>
        <div className="chat"></div>
      </div>
      {
        shows?
        <Search/>:""
        }
        {
          showschat?
          <Searchchat/>:""
        }
      </div>
      
  )
}

export default Nav2