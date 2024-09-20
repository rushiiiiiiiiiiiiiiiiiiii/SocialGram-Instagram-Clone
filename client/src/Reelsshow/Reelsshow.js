import React, { useEffect, useState } from 'react'
import Nav2 from '../Body/Nav2/Nav2'
import axios from 'axios'

const Reelsshow = () => {
    const [reel, setreel] = useState([])
    const reels = async () => {
        const data = await axios.get("http://127.0.0.1:8000/getpostall");
        setreel(data.data)
    }
    useEffect(() => {
        reels()
    })
    return (
        <div className='w-full h-auto bg-white text-black'>

            <div className='flex'>
                <Nav2 />
                <div className='snap-y snap-mandatory h-[100vh] overflow-y-scroll relative'>
                    {
                        reel.map((data, i) => (
                            <div className='snap-center w-[350px] h-[560px] ml-[600px] mt-6 mb-10 bg-black rounded-2xl relative'>
                                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt=""  className='rounded-2xl h-full cursor-pointer opacity-[0.5]' />
                                <p className='absolute bottom-10 left-10 text-white text-2xl font-normal'>{data.caption}</p>
                                {/* <p className='absolute bottom-10 left-10 text-white text-2xl font-normal'>{data.location}</p> */}
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Reelsshow
