// import React, { useState,useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import Profilepost from './Profilepost'
// const Reels = ({id}) => {
//     const[postdata, setPostdata]=useState([])
//     const [savedata, setSavedata] = useState([])
//     const userid= sessionStorage.getItem("userid")
//     const[open,setOpen] = useState(false)
//     const[showopen,setShowopen] = useState()
//     const  showus =(id)=>{
//         setOpen(true)
//         setShowopen(id)
//     }
//     useEffect(() => {
//         window.scrollTo(0, 0)
//     })
 
//     const showpostall = () => {
//         axios.get("http://127.0.0.1:8000/getpostall")
//             .then(res => {
//                 setPostdata(res.data)
//                 console.log(res.data)
//             })
//             .catch(err => console.log(err))
//     }
//     useEffect(() => {
//         showpostall()

//     }, [])
//     const showpost = () => {
//         axios.get("http://127.0.0.1:8000/getsave/"+id)
        
//             .then(res => {
//                 setSavedata(res.data)
//                 console.log(res.data)
//             })
//             .catch(err => console.log(err))
//     }
//     useEffect(() => {
//         showpost()
//     }, [id])
//     const isImage = (filename) => {
//         const extensions = ['jpg', 'jpeg', 'png', 'gif'];
//         return extensions.some(ext => filename.toLowerCase().endsWith(ext));
//       };
    
//       const isVideo = (filename) => {
//         const extensions = ['mp4', 'webm', 'ogg'];
//         return extensions.some(ext => filename.toLowerCase().endsWith(ext));
//       };
//   return (
//     <div className='flex gap-x-4 gap-y-4 -ml-7 flex-wrap mt-5'>
        
//         {open && <Profilepost className='bg-black bg-opacity-50' setOpen={setOpen} postid={showopen} />}

//          {/*<div>
//                 {
//                     savedata.map((data,i)=>(
//                 <div className="imf flex" key={data.id}>
//                     <img src={`http://127.0.0.1:8000/uploads/${postdata.photos}`} alt="" className='object-cover cursor-pointer w-60 h-64' />
//                 </div>
//                   ))
// }
//             </div>*/}
//             <div className='flex flex-wrap gap-x-4 gap-y-4'>
//                 {
//                     savedata.length>0  ?
//                 savedata.map((data) => {
//                     const post = postdata.find(post => post.id === data.pid);
//                     return post ? (
//                         <div className="imf flex object-cover" key={post.id}>
//                             {/* <img onClick={e=>showus(data.pid)}
//                                 src={`http://127.0.0.1:8000/uploads/${post.photos}`}
//                                 alt=""
//                                 className='object-cover cursor-pointer w-60 h-64'
//                             /> */}
//                 <video src={`http://127.0.0.1:8000/uploads/${post.photos}`} controls className='object-cover cursor-pointer w-60 h-64' />

//                         </div>
//                     ) : ""
//                 })
//                 :<div>
//                 <h1 className='text-3xl font-semibold ml-56 mt-24'>No Reels Saved Yet</h1>
//             </div>
//             }
//             </div>
// </div>
//   )
// }

// export default Reels
// import React, { useState, useEffect } from 'react'
// import Nav2 from '../Body/Nav2/Nav2'
// import { Link, useParams } from 'react-router-dom'
// import axios from 'axios'

// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaX } from 'react-icons/fa6';
// import { MdCancel } from 'react-icons/md';
// const Profilepost = ({ setOpen, postid }) => {
//     const [comment, setComment] = useState([])
//     const [commentpost, setCommentpost] = useState([])


//     const [name, setName] = useState()
//     const [uname, setUame] = useState()
//     const [com, setCom] = useState(0)

//     const userid = sessionStorage.getItem("userid")
//     const showpost = () => {
//         axios.get("http://127.0.0.1:8000/getuser/" + userid)
//             .then(res => {
//                 setName(res.data[0].name)
//                 setUame(res.data[0].username)
//             })
//             .catch(err => console.log(err))
//     }
//     useEffect(() => {
//         showpost()

//     }, [userid])
//     const getcommentc = async () => {
//         await axios.get("http://127.0.0.1:8000/getcomment/" + postid)
//             .then(res => {
//                 setComment(res.data)
//             })
//             .catch(err => console.log(err))
//     }

//     const getpostcom = async () => {
//         await axios.get("http://127.0.0.1:8000/getpostcom/" + postid)
//             .then(res => {
//                 setCommentpost(res.data)
//             })
//             .catch(err => console.log(err))
//     }
//     useEffect(() => {
//         getpostcom()
//         getcommentc()
//     }, [])
//     useEffect(() => {
//         getcommentc()
//     }, [com])

//     return (
//         <div className='w-[110%] h-screen bg-opacity-50 bg-black -ml-[400px] -mt-[310px] z-50 fixed'>
//             <button className=' float-right mr-72 mt-5 cursor-pointer'><MdCancel onClick={() => setOpen(false)} className='text-4xl text-blue-500' /></button>
//             <div className='flex ml-60'>

//                 <div className='bg-red-500 w-[900px] h-[570px] mt-10 flex shadow-xl'>
// <>
//                     {
//                         commentpost.map((data, i) => {


//                             return (
//                                 <div>
//                                 <div className='bg-black w-[450px] h-[570px] object-cover' key={i}>
//                                     <img className='w-[450px] h-[570px] object-cover pt-' src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="/" />
//                                     {/*<img className='w-[450px] h-[570px] ' src='/image/india.jpg' alt="/" />*/}

//                                 </div>
                         
//                     <div className=' w-[450px] h-[570px] bg-loww'>
//                         <div className="acc flex  border-black  h-16 w-full items-center justify-around">
//                             <div className="prof w-9 h-9 mx-5">
//                                 <Link to={`/prof/${sessionStorage.getItem("userid")}}`}><img src="/image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' /></Link>
//                             </div>
//                             <div className="det mr-64">
//                                 <h1 className='font-semibold'>{name}</h1>
//                                 <Link to={`/prof/${sessionStorage.getItem("userid")}`}><a className='text-gray-500 text-sm'>{uname}</a></Link>
//                             </div>

//                         </div>
//                         </div>
//                     )})}
//                         <div className='bg-white h-[442px] overflow-hidden'>
//                             {
//                                 comment.map((data, i) => (
//                                     <div className="com bg-white py-2 cursor-pointer pl-7 border-gray flex" key={i}>
//                                         <div>
//                                             <img src="/image/prof.jpg" alt="" className='h-8 w-8 rounded-full' />
//                                         </div>
//                                         <div>
//                                             <h1 className='ml-5'>{name}</h1>
//                                             <h1 className='ml-5 font-semibold'>{data.comment}</h1>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                         {
//                             commentpost.map((data, i) => (
//                                 <div className='flex  border-black bg-transparent' key={i} >=
//                                     <Com data={data.id} postid={postid} com={com} setCom={setCom} />

//                                 </div>

//                             ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Profilepost

// const Com = ({ data, postid, com, setCom }) => {
//     const [comment, setComment] = useState('')
//     const id = sessionStorage.getItem("userid")
//     const commentp = async () => {
//         setCom(com + 1)
//         console.log(com)
//         const datap = { id: id, pid: data, comment: comment }
//         await axios.post("http://127.0.0.1:8000/comment/" + id, datap)
//             .then(res => {
//                 toast.success("Comment Added")
//                 setComment('')
//             })
//             .catch(err => {
//                 console.log(err)
//                 toast.error("Faild to post comment")
//             })

//     }
//     return (
//         <>

//             <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder='Add Comment' className='bg-transparent font-semibold text-left pl-5 px-[150px] py-[18px]' />
//             <button onClick={() => commentp(data)} className='bg-indigo-500 px-7 py-5 font-semibold'>Post</button>

//         </>
//     )
// }
import React, { useState , useEffect} from 'react'
import Nav2 from '../Body/Nav2/Nav2'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaX } from 'react-icons/fa6';
import { MdCancel } from 'react-icons/md';
const Reels = ({setOpen, postid}) => {
    const[comment,setComment]= useState([])
    const[commentpost,setCommentpost]= useState([])
    
    
    const [name, setName] = useState()
    const [uname, setUame] = useState()
    const[com, setCom]= useState(0)
  
    const userid = sessionStorage.getItem("userid")
    const showpost = ()=>{
      axios.get("http://127.0.0.1:8000/getuser/"+ userid)
      .then(res=>{
          setName(res.data[0].name)
          setUame(res.data[0].username)
      })
      .catch(err=>console.log(err))
  }
  useEffect(()=>{
      showpost()
  
  },[userid])
    const getcommentc = async()=>{
        await axios.get("http://127.0.0.1:8000/getcomment/"+postid)
        .then(res=>{
          setComment(res.data)
        })
        .catch(err=>console.log(err))
       }
       
        const getpostcom = async()=>{
            await axios.get("http://127.0.0.1:8000/getpostcom/"+postid)
            .then(res=>{
              setCommentpost(res.data)
            })
            .catch(err=>console.log(err))
           }
            useEffect(() => {
              getpostcom()
              getcommentc()
            }, [])
            useEffect(()=>{
              getcommentc()
            },[com])
        
    return (
        <div className='w-[110%] h-screen bg-opacity-50 bg-black -ml-[405px] -mt-[308px] z-50 fixed'>
            <button className=' float-right mr-72 mt-5 cursor-pointer'><MdCancel onClick={()=>setOpen(false)} className='text-4xl text-blue-500'/></button>
            <div className='flex ml-60 -mt-5'>
                
                <div className='bg-red-500 w-[900px] h-[570px] mt-10 flex shadow-xl'>
                        
                            {
                            commentpost.map((data,i)=>(
                    <div className='bg-black w-[450px] h-[570px]' key={i}>
                    <img className='w-[450px] h-[570px] pt-' src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="/" />
                        {/*<img className='w-[450px] h-[570px] ' src='/image/india.jpg' alt="/" />*/}
                    
                    </div>
    ))}
                    <div className=' w-[450px] h-[570px] bg-loww'>
                        <div className="acc flex  border-black  h-16 w-full items-center justify-around">
                            <div className="prof w-9 h-9 mx-5">
                                <Link to={`/prof/${sessionStorage.getItem("userid")}}`}><img src="/image/prof.jpg" alt="" className='rounded-3xl cursor-pointer' /></Link>
                            </div>
                            <div className="det mr-64">
                                <h1 className='font-semibold'>{name}</h1>
                                <Link to={`/prof/${sessionStorage.getItem("userid")}`}><a className='text-gray-500 text-sm'>{uname}</a></Link>
                            </div>
                         
                        </div>
                        <div className='bg-white h-[442px] overflow-hidden'>
                            {
                            comment.length>0?
                                comment.map((data,i)=>(
                            <div className="com bg-white py-2 cursor-pointer pl-7 border-gray flex" key={i}>
                                <div>
                                    <img src="/image/prof.jpg" alt="" className='h-8 w-8 rounded-full' />
                                </div>
                                <div>
                                 <h1 className='ml-5'>{name}</h1>
                                <h1 className='ml-5 font-semibold'>{data.comment}</h1>
                                </div>
                            </div>
                                )):""
}
                        </div>
                        {
                            commentpost.map((data,i)=>(
                        <div className='flex  border-black bg-transparent' key={i} >
                        {/* <input type="text" placeholder='Add Comment' className='bg-transparent font-semibold text-left pl-5 px-[150px] py-[18px]'/>
                            <button className='bg-blue-500 px-7 py-5 font-semibold'>Post</button> */}
                          <Com data={data.id} postid={postid} com={com} setCom={setCom}/>
                            
                        </div>
                        
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reels

const Com = ({ data, postid, com, setCom }) => {
    const [comment, setComment] = useState('')
    const id = sessionStorage.getItem("userid")
    const commentp = async () => {
      setCom(com+1)
      console.log(com)
      const datap = { id: id, pid: data,comment: comment }
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
      
      <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder='Add Comment' className='bg-transparent font-semibold text-left pl-5 px-[150px] py-[18px]'/>
      <button onClick={() => commentp(data)} className='bg-indigo-500 px-7 py-5 font-semibold'>Post</button>
    
  </>
    )}