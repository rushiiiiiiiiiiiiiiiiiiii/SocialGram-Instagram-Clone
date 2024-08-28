import React, { useEffect, useState } from 'react'
import Nav from './Nav/Nav';
import Nav2 from './Nav2/Nav2';
import Story from './Story/Story';
import Post from './Post/Post';
import Chat from './Chat/Chat';
import Drop from './Drop/Drop';
import { IoMdSearch } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Body = () => {
  const [prof, setProf] = useState(false)
  const {postall,setPostall} = useState([])
  const adddrop = () =>{
    setProf(true)
  }
  const adddrop2 = ()=>{
    setProf(false)
  }
  
  return (
    <div className='w-full h-auto bg-white flex gap-60'>    
     {/* <nav className='navbar flex items-center justify-around w-full  bg-white h-14'>
        <div className="logo font-semibold mr-28 "><h1 className='text-indigo-500 text-[22px] mr-10'>SOCIAL GRAM</h1></div>


        <div className="search-bar w-full md:w-96 mr-10 bg-loww h-9 flex rounded-xl">
          <h1 className='pl-5 text-xl font-semibold pt-2 mr-5'><IoMdSearch /></h1><input type="text" className='placeholder:font-normal border-none outline-none h-8 bg-transparent w-auto pl- text-base' placeholder='Search Here.........' />
        </div>

        <div className="prof flex ">

          <button className='px-3 h-9 mt-1 mr-10 text-center  text-white text-sm font-medium btn bg-indigo-500 rounded-xl hidden md:block'>Add Post</button>
          <img src="./image/prof.jpg" className="rounded-3xl cursor-pointer w-10 h-10" />
        </div>
      </nav> */}
    
    {/* <nav className='navbar flex items-center justify-around w-full md:fixed  bg-white h-14'>
        <div className="logo font-semibold mr-28 "><h1 className='text-indigo-500 text-[22px] ml-9'>SOCIAL GRAM</h1></div>


        <div className="search-bar w-full md:max-w-xl mr-36 bg-loww h-9 flex rounded-xl">
          <h1 className='pl-5 text-xl font-semibold pt-2 mr-5'><IoMdSearch /></h1><input type="text" className='placeholder:font-normal border-none outline-none h-8 bg-transparent w-96 pl- text-base' placeholder='Search Here.........' />
        </div>

        <div className="prof flex mr-7">

          <button className='px-3 h-9 mt-1 mr-10 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl hidden md:block'>Add Post</button>
          <img src="./image/prof.jpg" className="rounded-3xl cursor-pointer w-10 h-10" onClick={adddrop} onDoubleClick={adddrop2}/>
         

        </div>
        
      </nav> */}

      {/* <div className="body flex">
        <div className="nav-comp hidden md:block ">
          <div className="acc flex bg-white rounded-xl mt-3 ml-14 h-14 w-60 items-center justify-around">
            <div className="prof w-9 h-9 mx-5">
              <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' />
            </div>
            <div className="det mr-5">
              <h1 className='font-semibold'>Rushikesh Arote</h1>
              <p className='text-gray-500 text-sm'>@rushi_07</p>
            </div>
          </div>
          <div className="nav-items bg-white mt-3 ml-14 rounded-xl w-60 cursor-pointer ">
            <ul className=''>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500 rounded-tr-xl rounded-tl-xl'><IoHomeOutline className='mt-1 mr-5'/>Home</li>
              <li className='py-4 flex pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><MdOutlineExplore className='mt-1 mr-5'/>Explore</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><IoMdNotificationsOutline className='mt-1 mr-5'/>Notification</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><RiMessage2Line className='mt-1 mr-5'/>Message</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaRegBookmark className='mt-1 mr-5'/>Book Marks</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><FaLevelUpAlt className='mt-1 mr-5'/>Analysis</li> 
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500'><MdOutlineColorLens className='mt-1 mr-5'/>Theme</li>
              <li className='py-4 flex  pl-10 w-60 text-[16px] font-semibold hover:bg-indigo-500 rounded-br-xl rounded-bl-xl'><IoSettingsOutline className='mt-1 mr-5'/>Settings</li>
            </ul>
          </div>
          <div className="btn2 mt-3 ml-14 mb-5">
            <button className='px-20 py-3 mr-10 text-center  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Create a Post</button>
          </div>
        </div>
        <div className="post"></div>
        <div className="chat"></div>
      </div> */}
   
      <Nav2/>
 <div>
      <Story/>
      <Post/>
</div>

<Chat/>
</div>
 
  )
}

export default Body