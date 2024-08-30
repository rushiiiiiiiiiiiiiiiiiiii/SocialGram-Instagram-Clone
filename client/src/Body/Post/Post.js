import React, { useState, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars, FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import CommentDialog from '../../Commentdialog/CommentDialog';
const Post = () => {
  const [postall, setPostall] = useState([])
  const [likeall, setLikeall] = useState([])
  const [showcom, setShowcom] = useState()

  const [likeallpost, setLikeallpost] = useState(0)
  const [open, setOpen] = useState(false)

  const getallpost = () => {

    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
  const getlikec = async () => {
    await axios.get("http://127.0.0.1:8000/getlike")
      .then(res => {
        setLikeall(res.data.length)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getallpost()
  }, [])

  useEffect(() => {
    getlikec()
  }, [likeallpost])

  const showus = (postid)=>{
    setOpen(true)
    setShowcom(postid)
  }
  const send = ()=>{
    alert("hiiiiiiiiiiiiiiii")
  } 
  return (
    <>

    <div className='ml-[50px]'>
      {
        open ? 
        <CommentDialog setOpen={setOpen} postid={showcom}/>:""
}

      {
        postall.map((data, i) => (
          <div className="post w-[540px] mt-2  border-b-2 border-gray" key={i}>
            <div className="info  ml-5 pt-2 pb-2 flex w-60">
              <img src="./image/prof.jpg" alt="" className='rounded-3xl cursor-pointer w-10 h-10' />
              <div className="det ml-5 w-80 ">
                <h1 className='font-semibold flex w-40' onClick={send}>Rushikesh Arote</h1>
                <p className='text-sm flex'>{data.location}</p>
              </div>
              <h1 className='ml-64 mt-1 pr-2'><FaBars className='mt-1 text-xl' /></h1>
            </div>

            <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-[500px] object-cover h-80 items-center ml-5 pb-4' />
            <div className="icon flex text-black justify-between">
              <div className='flex gap-7 text-xl -mt-2'>
                <div className='-mt-1 hover:text-red-500'>
                  <Lke className='' data={data.id} likcount={likeallpost} likecounttwo={setLikeallpost} />
                </div>
                <h1 className='cursor-pointer'><FaRegComment onClick={e=>showus(data.id)} /></h1>
                <h1 ><BiShareAlt /></h1>
                <div className='-ml-2'>
                  <Sav data={data.id} />
                </div>
              </div>

            </div>
            <p className='flex ml-6 -mt-[4px] text-[15px] '>{likeall} Likes</p>

            <p className='ml-6 mt-[2px] text-sm font-semibold'>{data.caption}</p>


            <div className='flex items-center justify-between mt-1'>
              <Com data={data.id} />

            </div>
          </div>
        ))
      }

    </div>
</>
  )
}

export default Post

const Lke = ({ data, likcount, likecounttwo }) => {
  const [likes, setLikes] = useState(0)
  const id = sessionStorage.getItem("userid")
  const likeing = async () => {
    var likc = likes + 1
    if (likc > 1) {
      likc = 0
    }
    setLikes(likc)

    const datap = { id: id, pid: data, likes: likc }
    await axios.post("http://127.0.0.1:8000/like/" + id, datap)
      .then(res => {
      })
      .catch(err => console.log(err))
    likecounttwo(likcount + 1);
  }

  return (
    <button className='ml-6 cursor-pointer focus:-red-500' onClick={() => likeing(data)}>
      <FaRegHeart className='focus:bg-red-500' />
    </button>

  )
}

const Com = ({ data }) => {
  const [comment, setComment] = useState('')
  const id = sessionStorage.getItem("userid")

  const commentp = async () => {

    const datap = { id: id, pid: data, comment: comment }
    await axios.post("http://127.0.0.1:8000/comment/" + id, datap)
      .then(res => {
        toast.success("Comment Added")
        setComment('')
      })
      .catch(err => {
        console.log(err)
        toast.error("Faild to post comment")
      })
  }
  return (
    <>
      <input value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder='Add a comment' className='ml-6 text-[14px] mb-1 border-none border-b-2 border-black outline-none bg-transparent' />

      <button className='font-semibold text-sm mr-5 hover:text-indigo-500'
        onClick={() => commentp(data)}>Post</button>
    </>

  )
}
const Sav = ({ data }) => {
  const [save, setSave] = useState(0)
  const id = sessionStorage.getItem("userid")

  const savep = async () => {

    const datap = { id: id, pid: data, save: data }
    await axios.post("http://127.0.0.1:8000/save/" + id, datap)
      .then(res => {
        toast.success("Post Saved")
      })
      .catch(err => {
        console.log(err)
        toast.error("Failed to save post")
      })
  }
  return (

    <button className='ml-[335px] focus:text-indigo-500' onClick={() => savep(data)}><FaRegBookmark className='focus:text-indigo-500' /></button>


  )
}