import React from 'react'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import {useState, useEffect} from "react";

const Story = () => {
    const [file, setFile] = useState()
    const[storyd,setStoryd] = useState([])
 var id = sessionStorage.getItem("userid")
 const create = async(e) =>{
   e.preventDefault()

   const formdata = new FormData()
   formdata.append("id",sessionStorage.getItem("userid"))
   formdata.append("photo",file)

    const config = {
        headers:{
           "content-type" : "multipart/form-data"
         }
    }    
     await axios.post("http://127.0.0.1:8000/createstory/"+id,formdata,config)
     
    .then(res=>{
        console.log(res)
 })
    .catch(err=>console.log(err))
}
const getstoryall = ()=>{
  axios.get("http://127.0.0.1:8000/getstory/"+id)
  .then(res=>{
    setStoryd(res.data)
  })
  .catch(err=>console.log(err))
}
useEffect(()=>{
  getstoryall()
},[])
  return (
    <div className="story mt-6 flex gap-3 overflow-x-hidden w-[638px]">
      
      <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative">
      <img src="/image/prof.jpg" className="h-10 w-10 rounded-full z-30 absolute top-2 left-2" alt="" />
      
      {
         storyd.map((data,i)=>(
          <div key={i}>
        <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="/" className='rounded-xl cursor-pointer object-cover w-24 h-40 ' />
      {/* <input type="file" className='hidden' />
      <button className='text-3xl mt-4 p-0 ml-8 text-center'><FaPlus/></button> */}
      </div>
       ))
      }
      { 
      storyd.length<=0 ?     
      <div className='mt-9'>
      <label className='ml-10'>
          <input name='photo' onChange={e=>setFile(e.target.files[0])}  class="text-sm ml-5 cursor-pointer border-none  w-[50px] hidden" type="file" multiple />
          <div class="text  ml-7 border-gray-300 rounded border-none -mt-3 font-semibold cursor-pointer p-1 w-[50px] text-center text-3xl"><FaPlus/></div>
        </label>
        <button onClick={create} className='w-10 h-5 bg-indigo-500 ml-7 text-center text-sm'>add</button>
        <h1 className='mt- text-center flex p-0 text-sm'>Rushikesh Arote</h1>
        </div>:
        ""
}
        </div>

      <div className="box-story w-24 h-40 bg-loww rounded-xl">
        <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-2 mt-2' />
        <h1 className='mt-[62px] text-center flex p-0 text-sm'>Rushikesh Arote</h1>
      </div>
      <div className="box-story w-24 h-40 bg-loww rounded-xl">
        <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-2 mt-2' />
        <h1 className='mt-[62px] text-center flex p-0 text-sm'>Rushikesh Arote</h1>
      </div>
      <div className="box-story w-24 h-40 bg-loww rounded-xl">
        <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-2 mt-2' />
        <h1 className='mt-[62px] text-center flex p-0 text-sm'>Rushikesh Arote</h1>
      </div>
      <div className="box-story w-24 h-40 bg-loww rounded-xl">
        <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-2 mt-2' />
        <h1 className='mt-[62px] text-center flex p-0 text-sm'>Rushikesh Arote</h1>
      </div>
      <div className="box-story w-24 h-40 bg-loww rounded-xl">
        <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10 ml-2 mt-2' />
        <h1 className='mt-[62px] text-center flex p-0 text-sm'>Rushikesh Arote</h1>
      </div>

    </div>
  )
}

export default Story