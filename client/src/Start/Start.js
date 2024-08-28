import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='w-full h-screen bg-indigo-500 flex items-center justify-center'>
       <Link to={'/register'}> <button className='bg-transparent border-white border-2 font-semibold hover:bg-white px-10 py-3'>START</button></Link>
    </div>
  )
}

export default Start