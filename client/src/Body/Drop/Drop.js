import React from 'react'
import { Link } from 'react-router-dom'

const Drop = (Drop) => {
  return (
   
    <div className='ml-24 mt-[54px] h-[100px] w-28 bg-white z-10 border-2 border-black'>
  <ul className='font-semibold text-black cursor-pointer'>
    <Link to='/prof'><li className='hover:bg-indigo-500 py-3 pl-3 border-b-2 border-black'>Profile</li></Link>
    <li className='hover:bg-indigo-500 py-3 pl-3'>Login</li>
  </ul>
</div>

    
  )
}

export default Drop