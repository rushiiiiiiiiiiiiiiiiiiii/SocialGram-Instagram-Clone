import React from 'react'
import Nav2 from '../Body/Nav2/Nav2'

const Reelsshow = () => {
    
    return (
        <div className='w-full h-auto bg-white text-black'>

            <div className='flex'>
                <Nav2 />
                <div>
                <div className='w-[350px] h-[560px] ml-[600px] mt-6  bg-red-500 rounded-2xl'>

                    <img src='./image/ban2.jpg' alt="" className='rounded-2xl object-cover w-[350px] h-[560px] cursor-pointer w-60 h-64' />

                </div>
                <div className='w-[350px] h-[560px] ml-[600px] mt-6  bg-red-500 rounded-2xl'>

                    <img src='./image/ban2.jpg' alt="" className='rounded-2xl object-cover w-[350px] h-[560px] cursor-pointer w-60 h-64' />

                </div><div className='w-[350px] h-[560px] ml-[600px] mt-6  bg-red-500 rounded-2xl'>

                    <img src='./image/ban2.jpg' alt="" className='rounded-2xl object-cover w-[350px] h-[560px] cursor-pointer w-60 h-64' />

                </div>
                </div>
            </div>
        </div>
    )
}

export default Reelsshow
