import React, { useState, useEffect } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars, FaHeart, FaRegComment } from "react-icons/fa";
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
  // const [likeall, setLikeall] = useState([])
  const [showcom, setShowcom] = useState()
  // const [likecount, setlikecount] = useState()
  const [likeallpost, setLikeallpost] = useState(0)
  const [open, setOpen] = useState(false)
  const[sdata,setSdata]= useState([])
  const [comment ,setComment] = useState([])

  const getdata = ()=>{
    axios.get("http://127.0.0.1:8000/getuserall")
    .then(res => {
      setSdata(res.data)})
    .catch(err => console.log(err))
   }
   
   useEffect(() => {
    getdata()
  }, [])
  const getallpost = () => {

    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);
      })
      .catch(err => console.log(err))
  }
  const getlikec = async (id) => {
    await axios.get("http://127.0.0.1:8000/getlike/" + id)
      .then(res => {
        if (res.data != null) {
          document.getElementById(id).innerText = res.data[`${id}`] + " likes"
        }
        else {
          document.getElementById(id).innerText = 0
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getallpost();
  }, [])
  const showus = (postid) => {
    setOpen(true)
    setShowcom(postid)
  }
  const getcommentc = async(postid)=>{
    await axios.get("http://127.0.0.1:8000/getcomment/"+postid)
    .then(res=>{
      setComment(res.data.length)
    })
    .catch(err=>console.log(err))
   }
   useEffect(()=>{
    getcommentc()
   })
  return (
    <>

      <div className='ml-[50px]'>
        {
          open ?
            <CommentDialog setOpen={setOpen} postid={showcom} /> : ""
        }
        {
          postall.slice().reverse().map((data) =>{
            const user = sdata.find(user=> user.id === data.sid)
            return(
            <div className="post w-[540px] mt-2  border-b-2 border-gray" key={data.id} onLoad={(e) => getlikec(data.id)}>
              <Link to={`/prof/${data.sid}`}><div className="info  ml-5 pt-2 pb-2 flex w-60">
                <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} alt="" className='rounded-3xl cursor-pointer w-10 h-10' />
                <div className="det ml-5 w-80 ">
                  <h1 className='font-semibold flex w-40' >{user?.name}</h1>
                  <p className='text-sm flex'>{data.location}</p>
                </div>
                <h1 className='ml-64 mt-1 pr-2'><FaBars className='mt-1 ml-[4px] text-xl' /></h1>
              </div></Link>

              <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-[500px] object-contain h-80 items-center ml-5 pb-4' />
              <div className="icon flex text-black justify-between">
                <div className='flex gap-7 text-xl -mt-2'>
                  <div className='-mt-1 '>
                    <Lke className='' data={data.id} likcount={likeallpost} likecounttwo={setLikeallpost} getlikec={(e) => getlikec(data.id)} />
                  </div>
                  <h1 className='cursor-pointer'><FaRegComment onClick={e => showus(data.id)} /></h1>
                  <h1 ><BiShareAlt /></h1>
                  <div className='-ml-2'>
                    <Sav data={data.id} />
                  </div>
                </div>
              </div>
              {/* {
                likeall.filter((likes, i) => {
                  if (likes.pid == data.id) {
                    return likes
                  }
                }).map((likes, i) => {
                  return (
                    <p className='flex ml-6 -mt-[4px] text-[15px] '>Likes</p>
                  );
                })
              } */}
              <p className='flex ml-6 -mt-[4px] text-[15px]' id={data.id} >{data.id} Likes</p>
              <p className='ml-6 mt-[px] text-[14px] flex'><p className='font-semibold pr-2 font-[15px]'>{user?.username}</p>{data.caption}</p>
              <p className='ml-6 text-[15px] text-gray-700 font-medium mt-[3px] cursor-pointer' onClick={e => showus(data.id)}>View all  {comment} comments</p>
           
              <div className='flex items-center justify-between  mt-1'>
                <Com data={data.id} />

              </div>
            </div>
          )})
        }

      </div>
    </>
  )
}

export default Post

const Lke = ({ data, likcount, likecounttwo, getlikec }) => {
  const [likes, setLikes] = useState(0)
  const id = sessionStorage.getItem("userid")
  const likeing = async () => {
    var likc = likes + 1
    if (likc > 1) {
      likc = 0;
    }
    setLikes(likc)
    const datap = { id: id, pid: data, likes: likc }
    await axios.post("http://127.0.0.1:8000/like/" + id, datap)
      .then(res => {
      })
      .catch(err => console.log(err))
    likecounttwo(likcount + 1);
    getlikec()
  }

  return (
    <button className='ml-6 cursor-pointer focus:-red-500' onClick={() => likeing(data)}>
      {
        likes>0?
      <FaHeart className='text-red-500'/>:<FaRegHeart/>
}
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

    <button className='ml-[335px] focus:text-indigo-500' onClick={() => savep(data)}>
      <FaRegBookmark className='focus:text-indigo-500' /></button>


  )
}
