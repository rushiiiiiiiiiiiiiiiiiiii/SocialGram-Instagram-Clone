import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BeatLoader } from 'react-spinners'

const Login = () => {
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const [values,setValues] = useState({
    email:'',
    password:''
  })
  const val = (e)=>{
    setValues({...values, [e.target.name]: e.target.value})
  }
  const login = (e)=>{
    e.preventDefault()
    setLoader(true)
    axios.post('http://127.0.0.1:8000/login',values)
    .then(res=>{
      if(res.data.length>0){
        sessionStorage.setItem("userid", res.data[0].id)
        toast.success("Login Succsesfully")
      console.log(res)
      navigate('/home')
      setLoader(false)

      }
      else{
        setLoader(false)
        toast.error("Email dosnt exist")
      }
    })
    .catch(err=>console.log(err))
  }
  return (
    <div class='flex justify-center items-center bg-indigo-600 h-screen'>
    <div className='w-96 bg-white grid '>
      <h1 class='text-center text-2xl font-bold m-2 mt-5'>LOGIN FORM</h1>
      <input onChange={val} type="email" required placeholder='Enter Email' name="email" class='p-3  mx-4 my-3  border-2 border-black' />
      <input onChange={val} type="password" required placeholder='Enter Password' name="password" class='p-3  mx-4 my-3  border-2 border-black' />
      <button onClick={login} class='bg-indigo-600 p-3   mx-4 my-3 text-lg font-semibold mb- hover:bg-indigo-400 '>{loader?<BeatLoader/>:"Login"}</button>
      <p className='text-center font-semibold  mb-1 flex ml-16'>Don't have an account?
       <p className='text-blue-700 font-bold underline'><Link    to={'/register'}>Register</Link></p></p>
    </div>
  </div>
  )
}

export default Login