import React, { useState } from 'react'
import Nav from '../Body/Nav/Nav'
import Nav2 from '../Body/Nav2/Nav2'
import { MdPanoramaVerticalSelect } from 'react-icons/md'
import { useEffect } from 'react'
import { json, Link, useParams } from 'react-router-dom'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { FaAlgolia, FaVideo } from 'react-icons/fa'
import { FaRegBookmark } from "react-icons/fa";
import { FiVideo } from 'react-icons/fi'
import axios from 'axios'
import Postdisplay from '../Profcomponent/Postdisplay'
import Save from '../Profcomponent/Save'
import Reels from '../Profcomponent/Reels'
import { toast } from 'react-toastify'
import Reelsshow from '../Reelsshow/Reelsshow'
import Reelspageprof from '../Profcomponent/Reelspageprof'
const Prof = () => {
    const { userid } = useParams();
    const [postall, setPostall] = useState([])
    const [showpostall, setShowpostall] = useState(true)
    const [showreelsall, setShowreelsall] = useState(false)
    const [showsaveall, setShowsaveall] = useState(false)
    const [name, setName] = useState()
    const [uname, setUame] = useState()
    const [file, setFile] = useState()
    const [follower, setfollower] = useState(0)
    const [following, setfollowing] = useState(0)
    const [youfollow, setyoufollow] = useState(0)
    const getpost = () => {
        setShowreelsall(false)
        setShowsaveall(false)
        setShowpostall(true)

    }
    const getreels = () => {
        setShowpostall(false)
        setShowsaveall(false)
        setShowreelsall(true)
    }
    const getsave = () => {
        setShowpostall(false)
        setShowreelsall(false)
        setShowsaveall(true)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })


    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getpost/" + userid)
            .then(res => {
                setPostall(res.data.length)
            })
            .catch(err => console.log(err))
    }
    const followerlist = async () => {
        try {
            const send = await axios.get("http://127.0.0.1:8000/getfollower", {
                params: {
                    id: userid
                }
            }
            )
            const follower = []
            const following = []
            send.data.map((name, i) => {
                if (name.following == sessionStorage.getItem('userid')) {
                    setyoufollow(name)
                }
                else{
                    setyoufollow(false)
                }
                
                if (name.following == userid) {
                    following.push(name.following)
                }
                if (name.follower == userid) {
                    follower.push(name.follower);
                }
                else {
                    setfollower(0);
                }

            })
            setfollower(follower.length)
            setfollowing(following.length)
        } catch (error) {
            console.log(error)
        }
    }
    const follow = async (id) => {
        try {
            const send = await fetch("http://127.0.0.1:8000/follow", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ userId: sessionStorage.getItem('userid'), id: id })

            })
            console.log(send)
            toast.success("Follow Done")

        } catch (error) {
            console.log(error)
        }
        followerlist()
    }
    useEffect(() => {
        showpost()
    }, [userid])
    const unfollow = async () => {
        try {
            await axios.delete("http://127.0.0.1:8000/unfollow/" + sessionStorage.getItem('userid') + "/" + userid)
            toast.success("UnFollow Done")
        } catch (error) {
            console.log(error)
        }
        followerlist();
    }
    const showlogin = () => {
        axios.get("http://127.0.0.1:8000/getuser/" + userid)
            .then(res => {
                setName(res.data[0].name)
                setUame(res.data[0].username)
                setFile(res.data[0].photos)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showlogin()
        followerlist()
    }, [userid])
    useEffect(() => {
    })

    return (
        <div className='w-full h-auto bg-white text-black'>

            <div className='flex'>
                <Nav2 />
                <div className='w-[965px] ml-[335px] mt-4  bg-white rounded-xl'>
                    <div className="prof-dte flex gap-20 ml-24 mt-5 border-b-2 border-gray-500 pb-[30px] w-[760px]">
                        <img src={`http://127.0.0.1:8000/uploads/${file}`} alt="" className='rounded-[50%] cursor-pointer w-36 h-36 mt-10' />
                        <div className="div">
                            <div className='flex gap-48'>
                                <h1 className='text-2xl '>{uname}</h1>
                                {
                                    userid == sessionStorage.getItem("userid") ?
                                        <Link to='/profedit'><button className='px-4 h-8 ml-[45px] mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Edit Profile</button></Link>
                                        :
                                        <div className='flex'>

                                            {
                                                // <>
                                                youfollow ?
                                                    <button onClick={(e) => unfollow(userid)} className='px-4 h-8 ml- mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Unfollow</button>
                                                    :
                                                    <button onClick={(e) => follow(userid)} className='px-4 h-8 ml- mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Follow</button>

                                                // </>
                                            }

                                            <Link to='/chat'><button className='px-4 h-8 ml-[5px] mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Message</button></Link>
                                        </div>
                                }</div>

                            <div className='flex gap-16 font-semibold mt-3 text-[19px]'>
                                <h1>{postall} Posts</h1>
                                <h1>{follower} Followers</h1>
                                <h1>{following} Following</h1>
                            </div>
                            <h1 className='mt-2 font-bold'>{name}</h1>

                            <div className='font-normal text-[15px]'>
                                <h1 className='mt-[5px] tracking-wide'>Goal Achiver</h1>
                                <p className='tracking-wide'>Web Developer</p>
                                <p className='tracking-wide'>Mumbai, Maharashtra</p>

                            </div>
                        </div>
                    </div>
                    <div className="pic ml-24 mt-2">
                        <div className='flex gap-20 ml-[180px] font-semibold cursor-pointer text-center'>
                            {
                                showpostall ? <h1 onClick={getpost} className=' border-b-4 text-indigo-500 border-blue-500 text-center p-0  flex'><FaRegSquarePlus className='mr-1 mt-[3px]' />POSTS</h1> :
                                    <h1 onClick={getpost} className='  text-center border-black flex'><FaRegSquarePlus className='mr-1 mt-[3px]' />POSTS</h1>
                            }
                            {showreelsall ? <h1 onClick={getreels} className='border-b-4 text-indigo-500 border-blue-500 text-center p-0  flex'><FiVideo className='mr-1 mt-[3px]' />REELS</h1> :
                                <h1 onClick={getreels} className='  text-center border-black flex'><FiVideo className='mr-1 mt-[3px]' />REELS</h1>
                            }
                            {showsaveall ? <h1 onClick={getsave} className='border-b-4 text-indigo-500 border-blue-500 text-center p-0  flex' ><FaRegBookmark className='mr-1  mt-[3px]' />SAVED</h1>
                                : <h1 onClick={getsave} className=' text-center border-black flex' ><FaRegBookmark className='mr-1  mt-[3px]' />SAVED</h1>
                            }
                        </div>

                        {/*} <div className='flex gap-x-4 gap-y-4 -ml-7 flex-wrap mt-5'>
                            {
                                postdata.map((data, i) => (

                                    <div>
                                        <div className="imf flex">
                                            <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='object-cover cursor-pointer w-60 h-64' />
                                        </div>
                                    </div>

                                ))
                            }
                        </div>*/}
                        {
                            showpostall ? <Postdisplay id={userid} />
                                : ""
                        }
                        {
                            showreelsall ?
                                <Reelspageprof id={userid} /> : ""
                        }
                        {
                            showsaveall ?
                                <Save id={userid} /> : ""
                        }
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Prof