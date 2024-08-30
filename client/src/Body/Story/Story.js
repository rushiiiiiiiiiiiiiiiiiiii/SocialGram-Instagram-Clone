import React from 'react'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { useState, useEffect } from "react";
import Storyupload from '../../Storyupload/Storyupload';

const Story = () => {
  const [showaddst, setShowaddst] = useState(false)
  const [storyd, setStoryd] = useState([])
  const [storyalluser, setStoryalluser] = useState([])
  var id = sessionStorage.getItem("userid")
  const [name, setName] = useState()
  const [uname, setUame] = useState()

  const[sdata,setSdata]= useState([])


  const getdata = ()=>{
    axios.get("http://127.0.0.1:8000/getuserall")
    .then(res => {
      console.log(res.data)
      setSdata(res.data)})
    .catch(err => console.log(err))
   }
   
   useEffect(() => {
    getdata()
  }, [])
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
  const getstoryall = () => {
    axios.get("http://127.0.0.1:8000/getstory/" + id)
      .then(res => {
        setStoryd(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getstoryall()
  }, [])
  const getstoryalluser = () => {
    axios.get("http://127.0.0.1:8000/getstoryall/"+id)
      .then(res => {
        setStoryalluser(res.data)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getstoryalluser()
  }, [])
  const showaddstory = () => {
    setShowaddst(true)
  }
  return (
    <div className="story mt-6 flex gap-3 overflow-x-hidden w-[638px]">
      {
        showaddst ?
          <Storyupload setShowaddst={setShowaddst} /> : ""
      }

      <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative cursor-pointer">
        <img src="/image/prof.jpg" className="h-10 w-10 rounded-full z-30 absolute top-2 left-2" alt="" />
        {
          storyd.map((data, i) => (
            <div className='w-24 h-40' key={i}>
              <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
            </div>
          ))
        }
        <h1 className='-mt-11 ml-2 text-[14px] font-semibold text-black'>{name}</h1>
        {
          storyd.length <= 0 ?

            <div className='mt-[58px]'>
              <h1 class="text  ml-7 border-gray-300 rounded border-none  font-semibold cursor-pointer p-1 w-[50px] text-center text-3xl"><FaPlus onClick={showaddstory} /></h1>

              <h1 className='mt-4 text-center  p-0 text-sm'>{name}</h1>
            </div>
            : ""
        }
      </div>


      <div className="box-story w-24 flex gap-3  h-40 bg-loww rounded-xl ml-[1px] cursor-pointer">
        {
          storyalluser.slice().reverse().map((data, i) =>(
            <div key={i}>
            <div className='w-24 h-40 relative'>
              <img src="/image/prof.jpg"  className='h-10 w-10 rounded-full z-50 absolute top-2 left-2' alt="" />
              <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
            
              {/* <h1  className='h-10 w-10 rounded-full z-50 pt-20 absolute top-2 left-2' alt="" >Rushikesh Arote</h1> */}
            </div>
            </div>
          ))
        }
        </div>

    </div>



  )
}

export default Story