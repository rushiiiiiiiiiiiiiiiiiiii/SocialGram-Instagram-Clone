
import React, { useState, useEffect, useRef } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { FaBars, FaHeart, FaRegComment } from "react-icons/fa";
import { BiShareAlt } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CommentDialog from '../../Commentdialog/CommentDialog';
import EmojiPicker from 'emoji-picker-react';
import ShareDialog from '../../ShareDialog/ShareDialog';

const Post = () => {
  const [postall, setPostall] = useState([]);
  const [showcom, setShowcom] = useState();
  const [likeallpost, setLikeallpost] = useState(0);
  const [open, setOpen] = useState(false);
  const [openuser, setOpenuser] = useState(false);
  const [sdata, setSdata] = useState([]);
  const [comment, setComment] = useState([]);
  const [muted, setMuted] = useState(true); // New state to track if audio is muted

  const getdata = () => {
    axios.get("http://127.0.0.1:8000/getuserall")
      .then(res => {
        setSdata(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const getallpost = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);
      })
      .catch(err => console.log(err));
  };

  const getlikec = async (id) => {
    await axios.get("http://127.0.0.1:8000/getlike/" + id)
      .then(res => {
        if (res.data != null) {
          document.getElementById(id).innerText = res.data[`${id}`] + " likes";
        } else {
          document.getElementById(id).innerText = 0;
        }
      })
      .catch(err => console.log(err));

    try {
      await axios.get('http://127.0.0.1:8000/commentlength/' + id)
        .then(res => {
          if (res.data != null) {
            document.getElementById(id + "p").innerText = "View all " + res.data[`${id}`] + " Comments";
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getallpost();
  }, []);

  const getcommentc = async (postid) => {
    await axios.get("http://127.0.0.1:8000/getcomment/" + postid)
      .then(res => {
        setComment(res.data.length);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getcommentc();
  });

  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const showus = (postid) => {
    setOpen(true);
    setShowcom(postid);
  };
  const showususer = (postid) => {
    setOpenuser(true);
    setShowcom(postid);
  };

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (e) => {
    setMuted(!muted);  // Toggle mute state
  };

  return (
    <>
      <div className='w-[100%] text-black mr-[25px]'>
        {open ? <CommentDialog setOpen={setOpen} postid={showcom} /> : ""}
        {openuser ? <ShareDialog setOpenuser={setOpenuser} postid={showcom}  /> : ""}
        {postall.slice().reverse().map((data) => {
          const user = sdata.find((user) => parseInt(data.sid)===user.id);
          return (
            <div className='md:w-[90%] md:ml-6  '>
            <div className="post  ml-5  md:ml-[25px] flex flex-col p-0 m-0 w-[530px] md:w-[85%] justify-center mt-2 border-b-2 border-gray" key={data.id} onLoad={() => getlikec(data.id)}>
              <Link to={`/prof/${data.sid}`}>
                <div className="info ml-9 pt-2 pb-2 flex w-60">
                  <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} alt="" className='rounded-3xl cursor-pointer w-10 h-10' />
                  <div className="det ml-5 w-80">
                    <h1 className='font-semibold flex w-40'>{user?.name}</h1>
                    <p className='text-[13px] -mt-[2px] flex'>{data.location}</p>
                  </div>
                  <h1 className='ml-[230px] mt-1 pr-2'><FaBars className='mt-1 ml-[4px] text-xl' /></h1>
                </div>
              </Link>

              {/* Display Image or Video */}
              <div className='w-[470px]  h-[580px] items-center  bg-black  ml-10 pb-10'>
                              {isImage(data.photos) ? (
                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-[470px] object-contain h-[580px] items-center' />
              ) : isVideo(data.photos) ? (
                <div>
                  <video
                    src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                    className='w-[470px] object-contain h-[580px] items-center '
                     // Bind the muted state
                    onClick={handleVideoClick} // Toggle play/pause on click
                    loop // Loop the video
                    autoPlay
                    muted={true}
                  />
                  {/* <button className="ml-5 mt-2 px-2 py-1 bg-blue-500 text-white rounded" onClick={toggleMute}>
                    {muted ? "Unmute" : "Mute"}
                  </button> */}
                </div>
              ) : null}
</div>
              <div className="icon flex ml-[18px] text-black justify-between">
                <div className='flex gap-5 text-[23px] mt-[13px]'>
                  <div className='-mt-[4px] '>
                    <Lke className='hover:scale-110 transition-transform' recid={data.sid} data={data.id} likcount={likeallpost} likecounttwo={setLikeallpost}
                     getlikec={() => getlikec(data.id)} />
                  </div>
                  <h1 className='cursor-pointer ml-[3px] -mt-[1px]'>
                    <FaRegComment className='hover:scale-110 transition-transform' onClick={() => showus(data.id)} />
                  </h1>
                  <h1><BiShareAlt className='cursor-pointer hover:scale-110 transition-transform' onClick={() => showususer(data.id)}/></h1>
                  <div className='-ml-5'>
                    <Sav data={data.id} />
                  </div>
                </div>
              </div>
              <p className='flex ml-[42px] -mt-[5px] text-[15px]' id={data.id}>{data.id} Likes</p>
              <p className='ml-[42px] mt-[px] text-[14px] flex'>
                <p className='pr-2 font-[15px]'>{user?.username}</p>{data.caption}
              </p>
              <p className='ml-[42px] text-[14.2px] text-gray-400 mt-[3px] cursor-pointer' onClick={() => showus(data.id)} id={`${data.id}p`}></p>
              <div className='flex items-center justify-between mt-1 ml-[18px]'>
                <Com  recidcom={data.sid} data={data.id}  getlikec={() => getlikec(data.id)} />
                  
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
const Lke = ({recid, data, likcount, likecounttwo, getlikec }) => {
  const [likes, setLikes] = useState(0)
  const id = sessionStorage.getItem("userid")
  const likeing = async () => {
    var likc = likes + 1
    if (likc > 1) {
      likc = 0;
    }
    setLikes(likc)
    const datap = { id: id, pid: data, recid: recid, likes: likc }
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

const Com = ({ recidcom, data, getlikec }) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const id = sessionStorage.getItem("userid");

  const handleEmojiClick = (emojiObject) => {
    setComment(comment + emojiObject.emoji);  // Directly access emoji property
  };
  

  const commentp = async ({getcommentc}) => {
    const datap = { id: id, pid: data, recidcom: recidcom, comment: comment };
    await axios.post("http://127.0.0.1:8000/comment/" + id, datap)
      .then(res => {
        toast.success("Comment Added");
        setComment('');  // Clear the input field after posting the comment
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to post comment");
      });
    getlikec();
  };

  return (
    <>
      <div className='comment-section'>
        {/* Comment input field */}
        <input
          value={comment}
          onChange={e => setComment(e.target.value)}
          type="text"
          placeholder='Add a comment...'
          className='ml-6 text-[14px] mb-1 border-none border-b-2 border-black outline-none bg-transparent'
        />
        <button className='font-semibold text-sm ml-60 mr-5 md:mr-6 hover:text-gray-500 text-blue-500' onClick={() => commentp(data)}>
          Post
        </button>

        {/* Button to toggle emoji picker */}
        <button className='emoji-toggle ml-0' onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          😀
        </button>

        {/* Emoji picker */}
        {showEmojiPicker && (
          <div className='emoji-picker'>
            <EmojiPicker onEmojiClick={handleEmojiClick} />

          </div>
        )}
      </div>
    </>
  );
};


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
