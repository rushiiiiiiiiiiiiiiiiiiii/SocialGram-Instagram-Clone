import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentDialog from '../Commentdialog/CommentDialog'
import Nav2 from '../Body/Nav2/Nav2'
const Explore = ({id}) => {
    const[postdata, setPostdata]=useState([])
    const [postall, setPostall] = useState([])
    const [profpost, setProfpost] = useState()
    // const id = sessionStorage.getItem("userid")
  const [open, setOpen] = useState(false);
  const [showopen, setShowopen] = useState(false);
       
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const  showus =(id)=>{
        setProfpost(id)
        setOpen(true)
        setShowopen(id)
    }
    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getpost/" + id)
            .then(res => {
                setPostdata(res.data)
                setPostall(res.data.length)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showpost()

    }, [id])
    const getallpost = () => {
        axios.get("http://127.0.0.1:8000/getpostall")
          .then(res => {
            setPostall(res.data)
          })
          .catch(err => console.log(err));
      };
      useEffect(()=>{
        getallpost()
        console.log(postall)
      })
      const handleVideoClick = (e) => {
        const video = e.target;
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      };
  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };
  return (
    <div className='w-full h-auto bg-white text-black'>

            <div className='flex'>
                <Nav2 />
    <div className=' ml-80 flex gap-x-4 gap-y-4 -ml-7 flex-wrap mt-5'>
    {
        postall.slice().reverse().map((data,i) => (
       
    <div className='flex gap-x-4 gap-y-4 flex-wrap'key={i}>

                
                {isImage(data.photos) ? (
                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='object-cover cursor-pointer w-60 h-64' />
              ) : isVideo(data.photos) ? (
                <video src={`http://127.0.0.1:8000/uploads/${data.photos}`} onClick={handleVideoClick}  autoPlay className='object-cover cursor-pointer w-60 h-64' />
              ) : null}
              </div>
            
    ))
            
}
</div>
</div>
</div>
  )
}

export default Explore