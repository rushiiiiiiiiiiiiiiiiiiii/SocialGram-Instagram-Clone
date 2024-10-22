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

// export default Login// Ensure Tailwind is installed and configured
import '../index.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const val = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    setLoader(true);
    axios
      .post('http://127.0.0.1:8000/login', values)
      .then((res) => {
        if (res.data.length > 0) {
          sessionStorage.setItem('userid', res.data[0].id);
          toast.success('Login Successfully');
          navigate('/home');
        } else {
          toast.error("Email doesn't exist");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-96 py-10 flex items-center flex-col mb-3 rounded-lg shadow-lg">
        <h1 className="text-center -mt-1 text-3xl font-bold mb-2">SocialGram</h1>
        <form className="mt-6 w-64 flex flex-col">
          <input
            onChange={val}
            autoFocus
            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none focus:border-gray-400 active:outline-none"
            id="email"
            name="email"
            placeholder="Enter Email"
            type="text"
          />
          <input
            onChange={val}
            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-6 py-4 focus:outline-none focus:border-gray-400 active:outline-none"
            id="password"
            name="password"
            placeholder="Enter Password"
            type="password"
          />
          <button
            onClick={login}
            className="text-sm text-center hover:bg-blue-500 bg-blue-400 text-white py-3 rounded font-medium transition duration-200"
          >
            {loader ? <BeatLoader size={8} color="#fff" /> : 'Log In'}
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span className="bg-gray-300 h-px flex-grow relative top-2"></span>
        </div>
        <a className="text-xs text-blue-900 mt-4 cursor-pointer">Forgot password?</a>
      </div>
      <div className="bg-white border border-gray-300 text-center w-96 py-4 rounded-lg shadow-lg">
        <span className="text-sm">Don't have an account?</span>
        <Link to={'/register'}>
          <span className="text-blue-500 ml-1 text-sm font-semibold cursor-pointer">Signup</span>
        </Link>
      </div>
      
    </div>
  );
};

export default Login;
