import React from 'react'
import { FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { useState, useEffect } from "react";
import Storyupload from '../../Storyupload/Storyupload';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Storyview from './Storyview';
const Story = () => {
  const [showaddst, setShowaddst] = useState(false)
  const [storyd, setStoryd] = useState([])
  const [storyalluser, setStoryalluser] = useState([])
  var id = sessionStorage.getItem("userid")
  const [name, setName] = useState()
  const [uname, setUame] = useState()
 const[photo,setphoto]=useState()
  const[sdata,setSdata]= useState([])
  const[file,setFile]= useState(null)
  const [open, setOpen] = useState(false);
  const [showcom, setShowcom] = useState();


  const getdata = ()=>{
    axios.get("http://127.0.0.1:8000/getuserall")
    .then(res => {
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
        setphoto(res.data[0].photos)
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
  
  const showus = (postid) => {
    setOpen(true);
    setShowcom(postid);
  };
  return (
    <div className="slider-container ml-[2px]  md:ml-0 story mb-3 mt-6 flex gap-3 overflow-x-scroll scrollbar-hide w-[540px] md:w-[638px] pb-5 border-b-2">
      {
        showaddst ?
          <Storyupload setShowaddst={setShowaddst} getstory={getstoryall} /> : ""
      }
 {
        open ?
          <Storyview setShowcom={setOpen} getstoryid={showcom} /> : ""
      }

      <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative cursor-pointer">
        {
          storyd.length>0?
          storyd.map((data, i) =>{
          const user= sdata.find(user=> user.id === data.sid)

          return(
            <div className='w-24 h-40' key={i}>
        <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} className="h-[50px] w-[50px] border-4 border-gray-500  rounded-full z-10 absolute top-1 left-2" alt="" />

              <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
            </div>
      )}):
      ""
    }
        {/* <h1 className='-mt-11 ml-2 text-[14px] font-semibold text-black'>{name}</h1> */}
    
        {
        storyd.length <= 0 ?

            <div className='mt-[px]'>
        <img src={`http://127.0.0.1:8000/uploads/${photo}`} className="h-10 w-10 rounded-full z-10 absolute top-2 left-2" alt="" />

              <h1 class="text  ml-7 border-gray-300 rounded border-none  font-semibold cursor-pointer p-1 w-[50px] mt-[90px] text-center text-3xl"><FaPlus onClick={showaddstory} /></h1>

              {/* <h1 className='mt-4 text-center  p-0 text-sm'>{name}</h1> */}
            </div>:""
          }
         
       
      </div>
 

      <div className="box-story w-24 flex gap-3  h-40 bg-loww rounded-xl ml-[1px] cursor-pointer">
        {
          storyalluser.length>0?
          storyalluser.slice().reverse().map((data, i) =>{
            const user = sdata.find(user=> user.id === data.sid)
              return(
            <div key={i}>
            <div className='w-24 h-40 relative' onClick={()=>showus(data.id)}>
              <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`}  className='h-[50px] w-[50px] rounded-full border-4 border-red-500 z-10 absolute top-1 left-2' alt="" />
              <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
            
              {/* <h1  className='h-10 w-10 rounded-full z-50 pt-20 absolute top-2 left-2' alt="" >Rushikesh Arote</h1> */}
            </div>
            </div>
          )}):""
        }

    <div className="story mt-6 flex gap-3 ">
      
      <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative">
      <img src="/image/prof.jpg" className="h-10 w-10 rounded-full z-30 absolute top-2 left-2" alt="" />
      
   
      { 
      storyd.length<=0 ?     
      <div className='mt-9' >
      <label className='ml-10'>
          <input name='photo' onChange={e=>setFile(e.target.files[0])}  class="text-sm ml-5 cursor-pointer border-none  w-[50px] hidden" type="file" multiple />
          <div class="text  ml-7 border-gray-300 rounded border-none -mt-3 font-semibold cursor-pointer p-1 w-[50px] text-center text-3xl"><FaPlus/></div>
        </label>
        {/* <button onClick={create} className='w-10 h-5 bg-indigo-500 ml-7 text-center text-sm'>add</button> */}
        <h1 className='mt- text-center flex p-0 text-sm'>Rushikesh Arote</h1>
        </div>:
        ""
}

        </div>

    </div>
</div>

</div>
  )
}

export default Story