import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    uname:'',
    email: '',
    password: ''
  });

  const val = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const register = (event) => {
    setLoader(true)
    event.preventDefault();
    if (values.name != "" && values.uname != "" && values.email != "" && values.password != "") {
      axios.post('http://127.0.0.1:8000/register', { ...values })
        .then(res => {
          toast.success("Registered Succsesfully")
          console.log(res)
          navigate('/login')
          setLoader(false)
        })
        .catch(err => console.log(err))
    }
    else {
      toast.error("Fill all the details")
    }
  }
  return (
    <div className='flex justify-center items-center bg-indigo-600 h-screen'>
      <div className='w-96 bg-white grid '>
        <h1 class='text-center text-2xl font-bold m-2 mt-5'>REGITER FORM</h1>
        <input onChange={val} type="text" required placeholder='Enter Full Name' name="name" className='p-3 mx-4 my-3 border-2 border-black' />
        <input onChange={val} type="text" required placeholder='Enter User Name' name="uname" className='p-3 mx-4 my-3 border-2 border-black' />
        <input onChange={val} type="email" required placeholder='Enter Email' name="email" className='p-3  mx-4 my-3  border-2 border-black' />
        <input onChange={val} type="password" required placeholder='Enter Password' name="password" class='p-3  mx-4 my-3  border-2 border-black' />
        <button onClick={register} className='bg-indigo-600 p-3   mx-4 my-3 text-lg font-semibold mb- hover:bg-indigo-400 '>{loader?<BeatLoader/>:"Register"}</button>
        <p className='text-center font-semibold  mb-1 flex ml-16'>Already have an account?
          <p className='text-blue-700 font-bold underline'><Link to='/login'>Login</Link></p></p>
      </div>
    </div>
  )
}

export default Register