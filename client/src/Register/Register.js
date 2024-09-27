
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { FaCamera, FaPlus, FaUser } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [filePreview, setFilePreview] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
   formData.append('photo', file);
    formData.append('name', name);
    formData.append('uname', uname);
    formData.append('email', email);
    formData.append('password', password);

    try {
      await axios.post('http://127.0.0.1:8000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoader(false);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
};
  return (
    <div className='flex justify-center items-center bg-indigo-600 h-screen'>
      <div className='w-[400px] h-[570px] bg-white p-3'>
        <h1 className='text-center text-2xl font-bold mb-2'>REGISTER FORM</h1>
      
        {/* <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          required
          placeholder='Upload Photo'
          name='photo'
          className='p-3 mx-4 my-3 border-2 border-black'
        /> */}
        <div className='flex text-center items-center justify-center'>
                       
                        {filePreview ?
                            <div className='w-[100px] h-[100px] object-cover  rounded-full'>
                                <img
                                    src={filePreview}
                                    alt="Preview"
                                    className='border-none  w-[100px] rounded-full h-[100px] object-cover'
                                />
                            </div>:
                            <div className='flex align-center bg-gray-300 justify-center w-[100px] h-[100px] object-cover text-center rounded-full'>
                                <div
                                    className='text-3xl mt-8'><FaUser className='text-white'/>                                </div>
                            </div>
                        }
                         <div className='input_field mt-2'>
                        <label>
                            <input
                                type='file'
                                onChange={handleFileChange}
                                className='text-sm cursor-pointer w-[550px] hidden'
                            />
                            <div className='text-lg rounded-full text-white bg-indigo-500 absolute top-[155px] left-[703px] z-10 font-semibold cursor-pointer p-1 w-[27px] text-center hover:bg-indigo-500'>
                                <FaPlus/> 
                            </div>
                        </label>
                    </div>
                    </div>
        <input
          onChange={(e) => setName(e.target.value)}
          type='text'
          required
          placeholder='Enter Full Name'
          name='name'
          className='p-3 mx-4 w-[340px] my-3 border-2 border-black'
        />
        <input
          onChange={(e) => setUname(e.target.value)}
          type='text'
          required
          placeholder='Enter User Name'
          name='uname'
          className='p-3 mx-4 w-[340px] my-3 border-2 border-black'
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          required
          placeholder='Enter Email'
          name='email'
          className='p-3 mx-4 my-3 w-[340px] border-2 border-black'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          required
          placeholder='Enter Password'
          name='password'
          className='p-3 mx-4 my-3 w-[340px] border-2 border-black'
        />
        <button
          onClick={handleSubmit}
          className='bg-indigo-600 p-3 w-[340px] mx-4 my-3 text-lg font-semibold hover:bg-indigo-400'
        >
          {loader ? <BeatLoader size={8} color="#fff" /> : 'Register'}
        </button>
        <p className='text-center font-semibold -mt-1'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-700 font-bold underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
