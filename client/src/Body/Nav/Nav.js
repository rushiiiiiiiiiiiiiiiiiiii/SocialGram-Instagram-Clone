import React, { useState } from 'react'
import { IoMdSearch } from "react-icons/io";

const Nav = (Drop) => {
  const [prof, setProf] = useState(false)
  const adddrop = () =>{
    setProf(true)
 
  }
  return (
    <nav className='navbar flex items-center justify-around w-full md:fixed  bg-white h-14'>
        <div className="logo font-semibold mr-28 "><h1 className='text-indigo-500 text-[22px] ml-9'>SOCIAL GRAM</h1></div>


        <div className="search-bar w-full md:max-w-xl mr-36 bg-loww h-9 flex rounded-xl">
          <h1 className='pl-5 text-xl font-semibold pt-2 mr-5'><IoMdSearch /></h1><input type="text" className='placeholder:font-normal border-none outline-none h-8 bg-transparent w-96 pl- text-base' placeholder='Search Here.........' />
        </div>

        <div className="prof flex mr-7">

          <button className='px-3 h-9 mt-1 mr-10 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl hidden md:block'>Add Post</button>
          <img src="./image/prof.jpg" className="rounded-3xl cursor-pointer w-10 h-10" onClick={adddrop} />
         

        </div>
        {
          prof?<Drop/>:""
        }
      </nav>
  )
}

export default Nav