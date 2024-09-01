import React, { useEffect, useState } from 'react';
import Nav2 from '../Body/Nav2/Nav2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

const Storyupload = ({setShowaddst, getstory}) => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const { userid } = useParams();
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    
    const id = sessionStorage.getItem("userid");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/getuser/${userid}`);
                setName(res.data[0].name);
                setUname(res.data[0].username);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userid]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile));
    };

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
         getstory()
         setShowaddst(false)
     }
    
    return (
        <div className=' w-full h-full bg-black bg-opacity-50 fixed z-40 -mt-7 -ml-80 items-center justify-center'>
            <button className=' float-right mr-72 mt-14 cursor-pointer' ><MdCancel onClick={()=>setShowaddst(false)} className='text-4xl text-blue-500'/></button>
           
                
                <div className='w-[600px] mt-20 ml-[380px] z-50 h-[500px] bg-white rounded-xl flex-col  items-center justify-center'>
                    <h1 className='font-bold text-xl  ml-5 pt-3 pb-1'>Create New Story</h1>
                    <div className='flex bg-loww mt-2 ml-5 rounded-xl w-[560px] items-center h-14'>
                        <img src="/image/prof.jpg" alt="Profile" className='rounded-full h-10 w-10 ml-5 mr-5' />
                        <div className='mr-56'>
                            <h1 className='font-semibold'>Aman Dubey</h1>
                            <p>aman_14</p>
                        </div>
                    </div>
                
                 
                    <div className='mt-3 ml-5'>
                        <h1 className='font-semibold text-[16px]'>Upload Picture</h1>
                        <div className='input_field mt-2'>
                            <label>
                                <input
                                    type='file'
                                    onChange={handleFileChange}
                                    className='text-sm cursor-pointer w-[550px] hidden'
                                />
                                <div className='text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 w-[550px] text-center hover:bg-indigo-500'>
                                    Select File
                                </div>
                            </label>
                        </div>
                        {filePreview && (
                            <div className='w-[550px] h-60 object-cover mt-2 border-none'>
                                <img
                                    src={filePreview}
                                    alt="Preview"
                                    className='border-none w-[550px] h-60 object-contain'
                                />
                            </div>
                        )}
                    </div>
              
            <button
                onClick={create}
                className='ml-5 h-8 px-4 mb-5 mt-[10px] w-[550px] text-center rounded hover:bg-indigo-500 text-white text-sm font-medium bg-indigo-600'>
                Add to Story
            </button>
            </div>
        
        </div>
    );
};

export default Storyupload;
