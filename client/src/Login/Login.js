// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { BeatLoader } from 'react-spinners'
// import toast, { Toaster } from 'react-hot-toast';
// const Login = () => {
//   const [loader,setLoader] = useState(false)
//   const navigate = useNavigate()
//   const [values,setValues] = useState({
//     email:'',
//     password:''
//   })
//   const val = (e)=>{
//     setValues({...values, [e.target.name]: e.target.value})
//   }
//   const login = (e)=>{
//     e.preventDefault()
//     setLoader(true)
//     axios.post('http://127.0.0.1:8000/login',values)
//     .then(res=>{
//       if(res.data.length>0){
//         sessionStorage.setItem("userid", res.data[0].id)
//         toast.success("Login Succsesfully")
//       console.log(res)
//       navigate('/home')
//       setLoader(false)

//       }
//       else{
//         setLoader(false)
//         toast.error("Email dosnt exist")
//       }
//     })
//     .catch(err=>console.log(err))
//   }
//   return (
//     <div class='flex justify-center items-center bg-indigo-600 h-screen'>
//     <div className='w-96 bg-white grid '>
//       <h1 class='text-center text-2xl font-bold m-2 mt-5'>LOGIN FORM</h1>
//       <input onChange={val} type="email" required placeholder='Enter Email' name="email" class='p-3  mx-4 my-3  border-2 border-black' />
//       <input onChange={val} type="password" required placeholder='Enter Password' name="password" class='p-3  mx-4 my-3  border-2 border-black' />
//       <button onClick={login} class='bg-indigo-600 p-3   mx-4 my-3 text-lg font-semibold mb- hover:bg-indigo-400 '>{loader?<BeatLoader/>:"Login"}</button>
//       <p className='text-center font-semibold  mb-1 flex ml-16'>Don't have an account?
//        <p className='text-blue-700 font-bold underline'><Link    to={'/register'}>Register</Link></p></p>
//     </div>
//   </div>
//   )
// }

// export default Login
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is installed and configured
import '../index.css';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast';
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
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <h1 className="bg-no-repeat instagram-logo"></h1>
        <form className="mt-8 w-64 flex flex-col">
          <input
          onChange={val}
            autoFocus
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email" name="email"
            placeholder="Enter Email"
            type="text"
          />
          <input
          onChange={val}
            autoFocus
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password" name="password"
            placeholder="Enter Password"
            type="password"
          />
          <button onClick={login} className="text-sm text-center hover:bg-blue-500 bg-blue-300 text-white py-1 rounded font-medium">
            Log In
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        {/* <button className="mt-4 flex">
          <div className="bg-no-repeat facebook-logo mr-1"></div>
          <span className="text-xs text-blue-900 font-semibold">Log in with Facebook</span>
        </button> */}
        <a className="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Don't have an account?</span>
        <Link to={'/register'}><a className="text-blue-500 ml-1 text-sm font-semibold">Signup</a></Link>
      </div>
      {/* <div className="mt-3 text-center">
        <span className="text-xs">Get the app</span>
        <div className="flex mt-3 space-x-2">
          <div className="bg-no-repeat apple-store-logo"></div>
          <div className="bg-no-repeat google-store-logo"></div>
        </div>
      </div> */}
    </div>
  );
};

export default Login;
