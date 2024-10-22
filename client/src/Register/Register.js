import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { FaUser, FaPlus } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [name, setName] = useState('');
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

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
        headers: { 'Content-Type': 'multipart/form-data' },
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

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-96 py-2 mt-3 h-[90vh]  flex items-center flex-col mb-3 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-4">SocialGram</h1>

        <div className="flex justify-center items-center relative">
          {filePreview ? (
            <img
              src={filePreview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
              <FaUser className="text-white text-4xl" />
            </div>
          )}

          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
            <FaPlus />
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="mt-4 w-64 flex flex-col" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter Full Name"
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none"
          />
          <input
            onChange={(e) => setUname(e.target.value)}
            required
            placeholder="Enter Username"
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
            type="email"
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            type="password"
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none"
          />
          <button
            type="submit"
            className="text-sm text-center hover:bg-blue-500 bg-blue-400 text-white py-3 rounded font-medium transition duration-200"
          >
            {loader ? <BeatLoader size={8} color="#fff" /> : 'Register'}
          </button>
        </form>

        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
        </div>

        <p className="text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
