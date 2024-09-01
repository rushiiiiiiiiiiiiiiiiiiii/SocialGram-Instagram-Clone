import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Profilepost from './Profilepost'
const Save = ({id}) => {
    const[postdata, setPostdata]=useState([])
    const [savedata, setSavedata] = useState([])
    const userid= sessionStorage.getItem("userid")
    const[open,setOpen] = useState(false)
    const[showopen,setShowopen] = useState()
    const  showus =(id)=>{
        setOpen(true)
        setShowopen(id)
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
 
    const showpostall = () => {
        axios.get("http://127.0.0.1:8000/getpostall")
            .then(res => {
                setPostdata(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showpostall()

    }, [])
    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getsave/"+id)
        
            .then(res => {
                setSavedata(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showpost()
    }, [id])
  return (
    <div className='flex gap-x-4 gap-y-4 -ml-7 flex-wrap mt-5'>
        {open && <Profilepost className='bg-black bg-opacity-50' setOpen={setOpen} postid={showopen} />}
        

         {/*<div>
                {
                    savedata.map((data,i)=>(
                <div className="imf flex" key={data.id}>
                    <img src={`http://127.0.0.1:8000/uploads/${postdata.photos}`} alt="" className='object-cover cursor-pointer w-60 h-64' />
                </div>
                  ))
}
            </div>*/}
            <div className='flex flex-wrap gap-x-4 gap-y-4'>
                {
                    savedata.length>0  ?
                savedata.map((data) => {
                    const post = postdata.find(post => post.id === data.pid);
                    return post ? (
                        <div className="imf flex object-cover" key={post.id}>
                            <img onClick={e=>showus(data.pid)}
                                src={`http://127.0.0.1:8000/uploads/${post.photos}`}
                                alt=""
                                className='object-cover cursor-pointer w-60 h-64'
                            />
                        </div>
                    ) : 
                    ""
                })
                :<div>
                <h1 className='text-3xl font-semibold ml-56 mt-24'>No Post Saved Yet</h1>
            </div>
            }
            </div>
</div>
  )
}

export default Save