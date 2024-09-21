import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaX } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
const Storyview = ({ setShowcom, getstoryid }) => {

    const [storyd, setStoryd] = useState([])
    const [storyalluser, setStoryalluser] = useState([])
    // const getdata = () => {
    //     axios.get("http://127.0.0.1:8000/getuserall")
    //         .then(res => {
    //             console.log(res.data)
    //             setSdata(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     getdata()
    // }, [])
    console.log(getstoryid)
    const userid = sessionStorage.getItem("userid")
    // const showpost = () => {
    //     axios.get("http://127.0.0.1:8000/getuser/" + id)
    //         .then(res => {
    //             setName(res.data[0].name)
    //             setUame(res.data[0].username)
    //         })
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     showpost()

    // }, [userid])

    const getstoryall = () => {
        axios.get("http://127.0.0.1:8000/getstorypic/" + getstoryid)
            .then(res => {
                setStoryd(res.data)
                console.log(res.data)

            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getstoryall()
    }, [])
    // const getstoryalluser = () => {
    //     axios.get("http://127.0.0.1:8000/getstoryall/" + getstoryid)
    //         .then(res => {
    //             setStoryalluser(res.data)
    // console.log(storyalluser)

    //         })
    //         .catch(err => console.log(err))
    // }
    // useEffect(() => {
    //     getstoryalluser()
    // }, [])
    return (
        <div className='w-[110%] h-screen bg-opacity-50 bg-black -ml-[400px] -mt-6 z-50 fixed'>
            <button className=' float-right mr-[480px] mt-3 cursor-pointer'><MdCancel onClick={() => setShowcom(false)} className='text-4xl text-blue-500' /></button>
            <div className='flex ml-[530px]'>
                {
                    storyd.map((data, i) => (
                        <div className='bg-red-500 w-[400px] h-[570px] mt-4 flex shadow-xl rounded-2xl' key={i} >

                            <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='bg-red-500 w-[440px] h-[570px] flex shadow-xl rounded-2xl' />

                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Storyview
