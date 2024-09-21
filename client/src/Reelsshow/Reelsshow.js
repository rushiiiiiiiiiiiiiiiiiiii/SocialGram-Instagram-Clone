import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CommentDialog from '../Commentdialog/CommentDialog'
import Profilepost from '../Profcomponent/Profilepost'
const Reelsshow = ({id}) => {
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
    const isImage = (filename) => {
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
      };
    
      const isVideo = (filename) => {
        const extensions = ['mp4', 'webm', 'ogg'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
      };
  return (
    <div className='flex gap-x-4 gap-y-4 -ml-7 flex-wrap mt-5'>
        {open && <Profilepost className='bg-black bg-opacity-50' setOpen={setOpen} postid={showopen} />}

    {
        postdata.length>0 ?
        postdata.map((data, i) => (

            <div className='flex gap-x-4 gap-y-4 flex-wrap'>
                { isVideo(data.photos) ? (
                <video src={`http://127.0.0.1:8000/uploads/${data.photos}`} controls className='object-cover cursor-pointer w-60 h-64' />
              ) : null}
            </div>

        ))
        :<div>
        <h1 className='text-3xl font-semibold ml-56 mt-24'>No Reels Posted Yet</h1>
    </div>
    }
</div>
  )
}

export default Reelsshow