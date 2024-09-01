import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Post=({post})=>(
    <div>
        <img src={'http://127.0.0.1:8000/uploads/${post.photos}'} height='30vh'/>
        <button>Like ({post.likes})</button>
        </div>
)
const Demo = () => {
    const [like,setLikeall]=useState()
    const [posts,setPostall]=useState([])
    const allliles=async()=>{
         await axios.get("http://127.0.0.1:8000/getlike")
         .then((res)=>{
            setLikeall(res.data);
         })
    }
    const allpost=async()=> {
        axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);   
      })
    }
    useEffect(()=>{
        allliles()
        allpost()
        console.log(posts);
    },[])
  return (
    <div>
      {
        posts.map((name,i)=>(
            <Post post={name}/>
        ))
      }
    </div>
  )
}

export default Demo;
