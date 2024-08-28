import React from 'react'

import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiMessage2Line } from "react-icons/ri";
import { FaBars, FaRegBookmark, FaSearch } from "react-icons/fa";
import { FaLevelUpAlt } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiVideo } from "react-icons/fi";

const Nav2 = () => {
  return (
    <div className="body flex md:fixed  border-r-[2px] border-gray h-full">
        <div className="nav-comp  md:block mt-6 ">
          <div className="logo font-semibold "><h1 className='text-indigo-500 text-[22px] ml-10'>SOCIAL GRAM</h1></div>

          {/* <div className="acc flex bg-white rounded-xl mt-3 h-14 w-60 items-center justify-around">
            <div className="prof w-9 h-9 mx-5">
              <Link to='/prof'><img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' /></Link>
            </div>
            <div className="det mr-5">
              <h1 className='font-semibold'>Rushikesh Arote</h1>
              <p className='text-gray-500 text-sm'>@rushi_07</p>
            </div>
          </div> */}
          <div className="nav-items bg-white mt-4 ml- rounded-xl w-68 cursor-pointer ">
            <ul className=''>
              <Link to='/home'><li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500  text-2xl'><IoHomeOutline className='mt-1 text-2xl mr-5'/>Home</li></Link>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FiSearch className='mt-1 mr-5 text-2xl'/>Search</li>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><MdOutlineExplore className='mt- mr-5 text-2xl'/>Explore</li>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FiVideo className='mt- mr-5 text-2xl'/>Reels</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><RiMessage2Line className='mt mr-5 text-2xl'/>Message</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaRegHeart className='mt- mr-5 text-2xl'/>Notification</li>
              <Link 
              to={`/create/${sessionStorage.getItem("userid")}`}><li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaRegSquarePlus className='mt- mr-5 text-2xl'/>Create</li></Link>
              <Link to={`/prof/${sessionStorage.getItem("userid")}`}><li className='py-4 flex  pl-9 w-60 text-[16px] font-semibold hover:bg-indigo-500 '><img src='./image/prof.jpg' className=' rounded-3xl cursor-pointer w-8 h-8 mr-5'/>Profile</li></Link>
            </ul>
          </div>
          <div className="btn2 mt-7 flex ml-[43px] mb-5">
            <h1 className='flex font-semibold'><FaBars className='mr-4 mt text-2xl'/> More</h1>
          </div>
        </div>
        <div className="post"></div>
        <div className="chat"></div>
      </div>
  )
}

export default Nav2