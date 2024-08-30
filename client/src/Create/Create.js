import React, { useEffect, useState } from 'react';
import Nav2 from '../Body/Nav2/Nav2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Create = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("location", location);
        formData.append("photo", file);
        formData.append("id", id);

        try {
            await axios.post(`http://127.0.0.1:8000/create/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            navigate('/home');
        } catch (err) {
            console.error(err);
            // Add user feedback here, e.g., setting an error state
        }
    };

    return (
        <div className='w-full h-auto bg-white'>
            <div className='flex'>
                <Nav2 />
                <div className='w-[965px] ml-[505px] mt-4 bg-white rounded-xl'>
                    <h1 className='font-bold text-xl pb-2'>Create New Post</h1>
                    <div className='flex bg-loww mt-2 rounded-xl w-[550px] items-center h-14'>
                        <img src="/image/prof.jpg" alt="Profile" className='rounded-full h-10 w-10 ml-5 mr-5' />
                        <div className='mr-56'>
                            <h1 className='font-semibold'>{name}</h1>
                            <p>{uname}</p>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-[16px]'>Description</h1>
                        <input
                            type='text'
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            className='mt-2 h-10 w-[550px] border-2 pl-5 border-loww rounded-xl'
                        />
                    </div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-[16px]'>Add Location</h1>
                        <input
                            type='text'
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className='mt-2 pl-5 w-[550px] border-2 h-10 border-loww rounded-xl'
                        />
                    </div>
                    <div className='mt-2'>
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
                            <div className='w-[550px] h-40 object-cover mt-2 border-none'>
                                <img
                                    src={filePreview}
                                    alt="Preview"
                                    className='border-none w-[550px] h-60 object-contain'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className='ml-[505px] h-8 px-4 mt-[90px] w-[550px] text-center rounded hover:bg-indigo-500 text-white text-sm font-medium bg-indigo-600'>
                Add Post
            </button>
        </div>
    );
};

export default Create;
