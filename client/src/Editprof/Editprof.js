import React from 'react'
import Nav2 from '../Body/Nav2/Nav2'

const Editprof = () => {
  return (
    <div className='w-full h-auto bg-white'>
        
        <div className='flex'>
        <Nav2/>
        <div className='w-[965px] ml-[505px] mt-7  bg-white rounded-xl'>
           <h1 className='font-semibold text-lg'>Edit Profile</h1>
           <div className='flex bg-loww mt-3 rounded-xl w-[550px] items-center justify-between h-16'>
             <img src="./image/prof.jpg" alt="" className='rounded-full h-10 w-10 ml-5 mr-5'/>
             <div className='mr-56 '>
                <h1>Rushikesh Arote</h1>
                <p>rushi_07___</p>
           </div>
                        <button className='mr-5 h-8 px-2 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Change Profile</button>
</div>
<div className='mt-5'>
<h1 className='font-semibold text-lg'>Bio</h1>
<textarea className='mt-2 h-40 w-[550px] border-2 border-loww rounded-xl' name="" id=""></textarea>
</div>
<div className='mt-5'>
    <h1 className='font-semibold text-lg'>Gender</h1>
    <select name="Gender" id="" className='mt-3 w-[550px] border-2 h-14 border-loww rounded-xl'>
      <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
</div>
<button className='ml-[480px] h-8 px-4 mt-5 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Submit</button>
   

        </div>
   </div>
        </div>

  )
}

export default Editprof