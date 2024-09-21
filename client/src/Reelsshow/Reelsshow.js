import React, { useEffect, useState } from 'react'
import Nav2 from '../Body/Nav2/Nav2'
import axios from 'axios'
import { FaBars } from 'react-icons/fa'

const Reelsshow = () => {

    const [postall, setPostall] = useState([])
    const getallpost = () => {
        axios.get("http://127.0.0.1:8000/getpostall")
            .then(res => {
                setPostall(res.data);
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        getallpost()
        getdata()
    })
    const isImage = (filename) => {
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    const isVideo = (filename) => {
        const extensions = ['mp4', 'webm', 'ogg'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
    };
    const [sdata, setSdata] = useState([]);

    const getdata = () => {
        axios.get("http://127.0.0.1:8000/getuserall")
            .then(res => {
                setSdata(res.data);
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='w-full h-auto bg-white text-black'>
            <div className='flex'>
                <Nav2 />
                <div className='snap-y snap-mandatory h-[100vh] overflow-y-scroll scrollbar-hide'>

                    {
                        postall.slice().reverse().map((data) => {
                            const user = sdata.find(user => user.id === data.sid);
                            return (
                                <div className='snap-center w-[350px] h-[560px] ml-[600px] mt-6 mb-10 bg-black rounded-2xl relative'>
                                    {/* <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt=""  className='rounded-2xl h-full cursor-pointer ' /> */}
                                    {isImage(data.photos) ? (
                                        <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='rounded-2xl h-full cursor-pointer ' />
                                    ) : isVideo(data.photos) ? (
                                        <video src={`http://127.0.0.1:8000/uploads/${data.photos}`} controls className='rounded-2xl h-full cursor-pointer ' />
                                    ) : null}

                                    <div className='flex bottom-40 -mt-24 ml-5 text-white '>
                                        <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} alt="" className='rounded-3xl cursor-pointer w-10 h-10' />
                                        <h1 className='font-semibold flex w-40 ml-3 mt-1'>{user?.name}</h1>
                                        <h1 className='font-semibold cursor-pointer -ml-9 -mt-2  text-3xl text-white'>.</h1>
                                        <button className='px-4 h-8 ml-2 text-center  text-white text-sm font-medium btn bg-transparent border border-white rounded-xl'>Follow</button>
                                        
                                       </div>
                                    <p className='absolute bottom-6 left-6 text-white text-md text-white font-normal'>{data.caption}</p>
                                    {/* <p className='absolute bottom-10 left-10 text-white text-2xl font-normal'>{data.location}</p> */}
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>

    )
}

export default Reelsshow
