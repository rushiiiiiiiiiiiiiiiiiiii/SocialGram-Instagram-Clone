import React, { useState , useEffect} from 'react'
import Nav2 from '../Body/Nav2/Nav2'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CommentDialog = () => {
    const[comment,setComment]= useState([])
    const[commentpost,setCommentpost]= useState([])

    const {id} = useParams()
    const [name, setName] = useState()
    const [uname, setUame] = useState()
  
    const userid = sessionStorage.getItem("userid")
    const showpost = ()=>{
      axios.get("http://127.0.0.1:8000/getuser/"+ userid)
      .then(res=>{
        console.log(res.data[0].name)
          setName(res.data[0].name)
          setUame(res.data[0].username)
      })
      .catch(err=>console.log(err))
  }
  useEffect(()=>{
      showpost()
  
  },[userid])
    const getcommentc = async()=>{
        await axios.get("http://127.0.0.1:8000/getcomment/"+id)
        .then(res=>{
          console.log(res.data);
          setComment(res.data)
        })
        .catch(err=>console.log(err))
       }
        useEffect(() => {
          getcommentc()
        }, [])
        const getpostcom = async()=>{
            await axios.get("http://127.0.0.1:8000/getpostcom/"+id)
            .then(res=>{
              console.log(res.data);
              setCommentpost(res.data)
            })
            .catch(err=>console.log(err))
           }
            useEffect(() => {
              getpostcom()
            }, [])
        
    return (
        <div className='w-full h-auto bg-white'>

            <div className='flex'>
                <Nav2 />
                <div className=' w-[900px] h-[570px] ml-[300px] mt-10 flex'>
                    {
                        commentpost.map((data,i)=>(
                    <div className='bg-black w-[440px] h-[570px]'key={i}>
                        <img className='w-[440px] h-[550px] pt-5' src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="/" />
                    </div>
                        ))
                    }
                    <div className=' w-[510px] h-[570px]  border-r-2 border-black'>
                        <div className="acc flex border-b-2 border-t-2 border-black  h-16 w-full items-center justify-around">
                            <div className="prof w-9 h-9 mx-5">
                                <Link to={`/prof/${sessionStorage.getItem("userid")}}`}><img src="/image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' /></Link>
                            </div>
                            <div className="det mr-64">
                                <h1 className='font-semibold'>Rushikesh Arote</h1>
                                <Link to={`/prof/${sessionStorage.getItem("userid")}`}><a className='text-gray-500 text-sm'>@rushi_07</a></Link>
                            </div>
                        </div>
                        <div className='bg-white h-[442px] overflow-scroll'>
                            {
                                comment.map((data,i)=>(
                            <div className="com bg-white py-4 border-b-2 border-gray" key={i}>
                                 <h1 className='ml-5'>{name}</h1>
                                <h1 className='ml-5 font-semibold'>{data.comment}</h1>
                            </div>
                                ))
}
                        </div>
                        {
                            commentpost.map((data,i)=>(
                        <div className='flex border-t-2 border-b-2 border-black bg-transparent' key={i}>
                        <Com data={data.id} />
                        </div>
                            ))
}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentDialog

const Com = ({ data }) => {
    const [comment, setComment] = useState('')
    const id = sessionStorage.getItem("userid")
  
    const commentp = async () => {
  
      const datap = { id: id, pid: data,comment: comment }
      await axios.post("http://127.0.0.1:8000/comment/" + id, datap)
        .then(res => {
            window.location.reload()
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
      
      <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder='Add Comment' className='bg-transparent font-semibold text-left pl-5 px-[181px] py-[18px]'/>
                            <button onClick={() => commentp(data)} className='bg-indigo-500 px-7 font-semibold'>Post</button>
    
  </>
    )}