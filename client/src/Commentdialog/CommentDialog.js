import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MdCancel } from 'react-icons/md'
import EmojiPicker from 'emoji-picker-react';

const CommentDialog = ({ setOpen, postid }) => {
  const [comment, setComment] = useState([])
  const [commentpost, setCommentpost] = useState([])
  const [name, setName] = useState('')
  const [uname, setUame] = useState('')
  const [com, setCom] = useState(0)
  const [sdata, setSdata] = useState([])

  const getdata = () => {
    axios.get("http://127.0.0.1:8000/getuserall")
      .then(res => setSdata(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getdata()
  }, [])

  const userid = sessionStorage.getItem("userid")

  const showpost = () => {
    axios.get("http://127.0.0.1:8000/getuser/" + userid)
      .then(res => {
        setName(res.data[0].name)
        setUame(res.data[0].username)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    showpost()
  }, [userid])

  const getcommentc = async () => {
    await axios.get("http://127.0.0.1:8000/getcomment/" + postid)
      .then(res => setComment(res.data))
      .catch(err => console.log(err))
  }

  const getpostcom = async () => {
    await axios.get("http://127.0.0.1:8000/getpostcom/" + postid)
      .then(res => setCommentpost(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getpostcom()
    getcommentc()
  }, [])

  useEffect(() => {
    getcommentc()
  }, [com])

  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif']
    return extensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg']
    return extensions.some(ext => filename.toLowerCase().endsWith(ext))
  }

  const handleVideoClick = (e) => {
    const video = e.target
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className='w-full h-screen bg-opacity-50 bg-black fixed top-0 left-0 flex items-center justify-center z-50'>
      <div className='w-[90%] max-w-[900px] h-[80%] bg-white relative'>
        <button className='absolute top-4 right-3'>
          <MdCancel onClick={() => setOpen(false)} className='text-4xl text-blue-500' />
        </button>
        <div className='flex flex-col md:flex-row h-full'>
          {/* Left Column - Image/Video */}
          <div className='w-full md:w-1/2 h-1/2 md:h-full bg-black flex items-center justify-center'>
            {commentpost.length > 0 && commentpost.map((data, i) => (
              <div className='h-full w-full' key={i}>
                {isImage(data.photos) ? (
                  <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-full h-full object-contain' />
                ) : isVideo(data.photos) ? (
                  <video src={`http://127.0.0.1:8000/uploads/${data.photos}`} onClick={handleVideoClick} loop autoPlay className='w-full h-full object-contain' />
                ) : null}
              </div>
            ))}
          </div>

          {/* Right Column - Comments */}
          <div className='w-full md:w-1/2 h-1/2 md:h-full bg-white'>
            {/* Post Info */}
            {commentpost.length > 0 && commentpost.map((data, i) => {
              const user = sdata.find(user => user.id === data.sid)
              return (
                <div className="flex items-center p-3 border-b-2 border-gray-300" key={i}>
                  <Link to={`/prof/${sessionStorage.getItem("userid")}`}>
                    <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} alt="" className='w-10 h-10 rounded-full' />
                  </Link>
                  <div className='ml-4'>
                    <h1 className='font-semibold'>{user?.name}</h1>
                    <Link to={`/prof/${sessionStorage.getItem("userid")}`}>
                      <span className='text-gray-500 text-sm'>{user?.username}</span>
                    </Link>
                  </div>
                </div>
              )
            })}

            {/* Comments */}
            <div className='h-[40%] md:h-[75%] overflow-y-auto'>
              {comment.length > 0 && comment.map((data, i) => {
                const user = sdata.find(user => user.id === data.sid)
                return (
                  <div className="flex items-center p-1 pl-3 border-b" key={i}>
                    <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} alt="" className='w-8 h-8 rounded-full' />
                    <div className='ml-5  '>
                      <h1>{user?.name}</h1>
                      <h2 className='font-semibold'>{data.comment}</h2>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Comment Input */}
            {commentpost.length > 0 && commentpost.map((data, i) => (
              <div className='flex p-3 mt-5 md:-mt-5' key={i}>
                <Com recid={data.sid} data={data.id} postid={postid} com={com} setCom={setCom}  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentDialog

const Com = ({ recid, data, postid, com, setCom,getlikecs }) => {
  const [comment, setComment] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const id = sessionStorage.getItem("userid")
  const handleEmojiClick = (emojiObject) => {
    setComment(comment + emojiObject.emoji);  // Directly access emoji property
  };
  
  const commentp = async () => {
    setCom(com + 1)
    const datap = { id: id, pid: data,recidcom:recid,comment: comment }
    await axios.post("http://127.0.0.1:8000/comment/" + id, datap)
      .then(res => {
        toast.success("Comment Added")
        setComment('')
      })
      .catch(err => {
        console.log(err)
        toast.error("Failed to post comment")
      })
  }

  return (
    <>
    {showEmojiPicker && (
          <div className='emoji-picker mb-60'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />

          </div>
        )}
     <button className='emoji-toggle text-lg ml-0 mr-2' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </button>
    
      <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder='Add Comment' className='flex-1 px-4 py-2 border rounded-md' />
      <button onClick={() => commentp(data)} className='hover:bg-blue-400 bg-blue-500 px-4 py-2 ml-2 text-white rounded-md'>Post</button>
    </>
  )
}
