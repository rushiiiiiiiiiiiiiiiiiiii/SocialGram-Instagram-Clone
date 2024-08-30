import React, { useState } from 'react'
import Nav from '../Body/Nav/Nav'
import Nav2 from '../Body/Nav2/Nav2'
import { MdPanoramaVerticalSelect } from 'react-icons/md'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaRegSquarePlus } from 'react-icons/fa6'
import { FaVideo } from 'react-icons/fa'
import { FaRegBookmark } from "react-icons/fa";
import { FiVideo } from 'react-icons/fi'
import axios from 'axios'
import Postdisplay from '../Profcomponent/Postdisplay'
import Save from '../Profcomponent/Save'
const Prof = () => {
    const { userid } = useParams();
    const [postall, setPostall] = useState([])
    const[showpostall, setShowpostall] = useState(true)
    const[showsaveall, setShowsaveall] = useState(false)

    const getpost = ()=>{
        setShowsaveall(false)
        setShowpostall(true)

    }
    const getsave = ()=>{
        setShowpostall(false)
        setShowsaveall(true)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getpost/" + userid)
            .then(res => {
                setPostall(res.data.length)
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showpost()

    }, [userid])

    const [name, setName] = useState()
    const [uname, setUame] = useState()
    const showlogin = () => {
        axios.get("http://127.0.0.1:8000/getuser/" + userid)
            .then(res => {
                setName(res.data[0].name)
                setUame(res.data[0].username)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showlogin()

    }, [userid])
    return (
        <div className='w-full h-auto bg-white'>

            <div className='flex'>
                <Nav2 />
                <div className='w-[965px] ml-[335px] mt-4  bg-white rounded-xl'>
                    <div className="prof-dte flex gap-20 ml-24 mt-5 border-b-2 border-gray-500 pb-[30px] w-[760px]">
                        <img src="/image/prof.jpg" alt="" className='rounded-[50%] cursor-pointer w-36 h-36 mt-10' />
                        <div className="div">
                            <div className='flex gap-48'>
                                <h1 className='text-2xl '>{uname}</h1>
                                {
                                    userid==sessionStorage.getItem("userid")?
                                <Link to='/profedit'><button className='px-4 h-8 ml-[45px] mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Edit Profile</button></Link>                
 : 
 <div className='flex'>
 <button className='px-4 h-8 ml- mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Follow</button>               
 <button className='px-4 h-8 ml-[5px] mt-1 text-center hover:bg-indigo-400  text-white text-sm font-medium btn bg-indigo-500 rounded-xl'>Message</button>               
</div>
}</div>

                                    <div className='flex gap-16 font-semibold mt-3 text-[19px]'>
                                <h1>{postall} Posts</h1>
                                <h1>1230 Followers</h1>
                                <h1>256 Following</h1>
                            </div>
                            <h1 className='mt-2 font-bold'>{name}</h1>

                            <div className='font-normal text-[15px]'>
                                <h1 className='mt-[5px] tracking-wide'>Goal Achiver</h1>
                                <p className='tracking-wide'>Web Developer</p>
                                <p className='tracking-wide'>Mumbai, Maharashtra</p>

                            </div>
                        </div>
                    </div>
                    <div className="pic ml-24 mt-3">
                        <div className='flex gap-0 ml-40 font-semibold cursor-pointer'>
                            <h1 onClick={getpost} className='w-40 hover:text-indigo-500 text-center border-black flex'><FaRegSquarePlus className='mr-1 mt-[3px]' />POSTS</h1>
                            <h1 className='w-40 hover:text-indigo-500  text-center border-black flex'><FiVideo className='mr-1 mt-[3px]'  />REELS</h1>
                            <h1 onClick={getsave}className='w-40 hover:text-indigo-500 text-center border-black flex' ><FaRegBookmark className='mr-1  mt-[3px]'/>SAVED</h1>
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
                            showpostall?<Postdisplay   id={userid}/>
                            :""

        
                           }
{
                            showsaveall?
                            <Save  id={userid}/>:  ""

}
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Prof