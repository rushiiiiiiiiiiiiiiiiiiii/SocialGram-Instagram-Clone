import React, {useEffect, useRef, useState} from 'react'
import { FiLogOut } from "react-icons/fi";
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
          <div className="logo font-semibold "><h1 className='text-blue-500 text-[22px] ml-10'>SOCIAL GRAM</h1></div>

          <div className="nav-items mt-4 ml- rounded-xl w-[248px] cursor-pointer ">
            <ul className='ml-3 rounded-xl '>
              <Link to='/home'><li className='rounded-xl h-14 flex  pl-10 px-1 w-56 text-[16px] text-center pt-[12px] font-semibold hover:bg-indigo-500  text-2xl'><IoHomeOutline className='mt-1 text-2xl mr-5 -ml-3'/>Home</li></Link>
              <h1 onClick={show} className='rounded-xl h-14 pt-[14px] flex pl-10 w-56 text-[16px] font-semibold hover:bg-indigo-500'><FiSearch className='mt- mr-5  text-2xl -ml-3'/>Search</h1>
              <Link to='/explore'><h1  className='rounded-xl pt-[14px] h-14 flex pl-10 w-56 text-[16px] font-semibold hover:bg-indigo-500'><MdOutlineExplore className='mt- mr-5  text-2xl -ml-3' />Explore</h1></Link>
              <Link to='/reelshow'><li className='rounded-xl pt-[14px] h-14 flex pl-10 w-56 text-[16px] font-semibold hover:bg-indigo-500'><FiVideo className='mt- mr-5  text-2xl -ml-3'/>Reels</li></Link>
              <h1 onClick={showchat}className='rounded-xl pt-[14px] h-14 flex  pl-10 w-56 text-[16px] font-semibold hover:bg-indigo-500'><RiMessage2Line className='mt mr-5  text-2xl -ml-3'/>Message</h1>
              <li className='rounded-xl h-14 flex  pl-10 pt-[14px] w-56 text-[16px] font-semibold hover:bg-indigo-500'><FaRegHeart className='mt- mr-5  text-2xl -ml-3'/>Notification</li>
              <Link to={`/create/${sessionStorage.getItem("userid")}`}><li className='rounded-xl pt-[14px] h-14 flex  pl-10 w-56 text-[16px] font-semibold hover:bg-indigo-500'><FaRegSquarePlus className='-ml-3 mr-5  text-2xl '/>Create</li></Link>
              <Link to={`/prof/${sessionStorage.getItem("userid")}`}><li className='rounded-xl pt-[14px]  h-14 flex  pl-9 w-56 text-[16px] font-semibold hover:bg-indigo-500 '><img src={`http://127.0.0.1:8000/uploads/${file}`} className='-ml-2 rounded-3xl cursor-pointer w-8 h-8 mr-5 '/>Profile</li></Link>
            </ul>
          </div>
          <div onClick={themechange} className="btn2 mt-7 flex ml-[43px] mb-5">
            <h1 className='flex font-semibold cursor-pointer hover:text-red-500' onClick={logout}><FiLogOut className='mr-4 mt text-2xl cursor-pointer'/> Logout</h1>
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