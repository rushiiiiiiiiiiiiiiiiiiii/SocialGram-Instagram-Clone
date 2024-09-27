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
    const id = sessionStorage.getItem("userid");
    const [name, setName] = useState('');
    const [uname, setUname] = useState('');
    const [userfile, setUserfile] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/getuser/${userid}`);
                setName(res.data[0].name);
                setUname(res.data[0].username);
                setUserfile(res.data[0].photos);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    }, [userid]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);  // Set the new file
            setFilePreview(URL.createObjectURL(selectedFile));  // Generate a preview for the new file
        }
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
        }
    };

    return (
        <div className='w-full h-screen bg-white'>
            <div className='flex'>
                <Nav2 />
                <div className='bg-white ml-[350px] rounded-xl mt-3 border-black h-[580px] shadow-lg w-[900px] flex flex-col p-6'>
                    {/* Top section: User profile and title */}
                    <div className='flex items-center justify-between border-b pb-3 -mt-2'>
                        <h1 className='font-semibold text-xl'>Create New Post</h1>
                        <div className='flex items-center'>
                            <img
                                src={`http://127.0.0.1:8000/uploads/${userfile}`}
                                alt="Profile"
                                className='w-10 h-10 rounded-full mr-3'
                            />
                            <div>
                                <h1 className='font-semibold'>{name}</h1>
                                <p className='text-sm text-gray-500'>{uname}</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle section: File input, caption, location */}
                    <div className='mt-6'>
                        <div className='flex justify-between'>
                            {/* Left: Image/Video preview */}
                            <div className='w-[60%] h-[400px] border-dashed border-2 border-gray-300 flex items-center justify-center relative'>
                                {filePreview ? (
                                    <>
                                        {file && file.type.startsWith('image') ? ( // Check if file is not null and is an image
                                            <img
                                                src={filePreview}
                                                alt="Preview"
                                                className='w-full h-full object-cover'
                                            />
                                        ) : (
                                            <video
                                                src={filePreview}
                                                autoPlay
                                                className='w-full h-full object-cover'
                                            />
                                        )}
                                        {/* Centered Change File button */}
                                        <button
                                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-300 hover:bg-gray-400 transition text-sm font-semibold py-2 px-4 rounded'
                                            onClick={() => {
                                                setFile(null);
                                                setFilePreview(null); // Reset both the file and preview
                                            }}  
                                        >
                                            Change File
                                        </button>
                                    </>
                                ) : (
                                    <label className='cursor-pointer text-indigo-600'>
                                        <input
                                            type='file'
                                            onChange={handleFileChange}
                                            className='hidden'
                                        />
                                        <div className='text-center'>
                                            <p className='font-semibold'>Select a file to upload</p>
                                            <p className='text-sm'>Drag & drop or click to select</p>
                                        </div>
                                    </label>
                                )}
                            </div>

                            {/* Right: Caption and Location inputs */}
                            <div className='w-[35%]'>
                                <div className='mb-4'>
                                    <label className='font-semibold block mb-2 text-gray-700'>Caption</label>
                                    <textarea
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        rows={4}
                                        className='w-full border border-gray-300 p-3 rounded-md resize-none'
                                        placeholder="Write a caption..."
                                    />
                                </div>

                                <div className='mb-4'>
                                    <label className='font-semibold block mb-2 text-gray-700'>Location</label>
                                    <input
                                        type='text'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className='w-full border border-gray-300 p-3 rounded-md'
                                        placeholder="Add location"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom section: Add Post button */}
                    <div className='mt-6'>
                        <button
                            onClick={handleSubmit}
                            className='w-full bg-indigo-600 text-white py-2 rounded-md text-center font-semibold hover:bg-indigo-500 transition'>
                            Add Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
