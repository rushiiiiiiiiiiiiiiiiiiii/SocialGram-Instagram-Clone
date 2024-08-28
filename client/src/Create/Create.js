import React, { useState } from 'react'
import Nav2 from '../Body/Nav2/Nav2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Create = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState()
    const [files, setFiles] = useState("No selected file")

     const [caption, setCaption] = useState('')
     const [location, setLocation] = useState('')
 var id = sessionStorage.getItem("userid")
 const create = async(e) =>{
   e.preventDefault()

   const formdata = new FormData()
   formdata.append("caption", caption)
   formdata.append("location", location)
   formdata.append("photo",files)
   formdata.append("id",sessionStorage.getItem("userid"))

    const config = {
        headers:{
           "content-type" : "multipart/form-data"
         }
    }    
     await axios.post("http://127.0.0.1:8000/create/"+id,formdata,config)
     
    .then(res=>{
        console.log(res)
    console.log(formdata)
    navigate('/home')
 })
    .catch(err=>console.log(err))
}
   
    return (
        <div className='w-full h-auto bg-white'>

            <div className='flex'>
                <Nav2 />
                <div className='w-[965px] ml-[505px] mt-5  bg-white rounded-xl'>
                    <h1 className='font-semibold text-lg'>Create New Post</h1>
                    <div className='flex bg-loww mt-2 rounded-xl w-[550px] items-center  h-14'>
                        <img src="./image/prof.jpg" alt="" className='rounded-full h-10 w-10 ml-5 mr-5' />
                        <div className='mr-56 '>
                            <h1>Rushikesh Arote</h1>
                            <p>rushi_07___</p>
                        </div>
                        {/* <button className='mr-5 h-8 px-2 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Change Profile</button> */}
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-[16px]'>Description</h1>
                        <input type='text' value={caption} name='caption' onChange={e=>setCaption(e.target.value)} className='mt-2 h-10 w-[550px] border-2 pl-5 border-loww rounded-xl'  id="" />
                    </div>
                    <div className='mt-'>
                        <h1 className='font-semibold text-[16px]'>Add Location</h1>
                        <input type='text' value={location} name='location' onChange={e=>setLocation(e.target.value)} id="" className='mt-2 pl-5 w-[550px] border-2 h-10 border-loww rounded-xl' />

                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-[16px]'>Upload Picture</h1>
                        {/* <input type='file' id="" className='mt-3 w-[550px] border-2 h-14 border-loww rounded-xl'/> */}
                        <div class="input_field  mt-2">
                            <label>
                                <input name='photo' onChange={e=>setFiles(e.target.files[0])} class="text-sm cursor-pointer w-[550px] hidden" type="file" multiple />
                                <div class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 w-[550px] text-center hover:bg-indigo-500">Select File</div>
                            </label>

                        </div>
                        {/* {file? */}
                        <div className='w-[550px] h-40 object-cover mt-2 border-none'>
                            <img src={files} alt="" value={files} className='border-none w-[550px] h-60 object-cover' />
                        </div>

                        {/* <div class="fixed z-10 w-full h-full flex ">

    <div class="extraOutline w-[550px] p-m-auto rounded-lg">
        <div class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg width: 450px">
        <svg class="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <div class="input_field flex flex-col w-max mx-auto text-center">
                <label>
                    <input class="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                    <div class="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                </label>

                <div class="title text-indigo-500 uppercase">or drop files here</div>
            </div>
        </div>
    </div> */}
                    </div>
                </div>

            </div>

            <button onClick={create} className='ml-[505px] h-8 px-4 mt-[90px] w-[550px] text-center rounded hover:bg-indigo-500  text-white text-sm font-medium btn bg-indigo-600 '>Add Post</button>

        </div>


    )
}

export default Create