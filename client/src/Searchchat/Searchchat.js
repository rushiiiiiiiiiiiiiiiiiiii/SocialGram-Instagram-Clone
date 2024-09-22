import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RiMessage2Line } from 'react-icons/ri'
import ChatPage from '../ChatPage/ChatPage'
const Searchchat = () => {

  const[sdata,setSdata]= useState([])
  const [search,setSearch]= useState('')
  const [chatshow, setChatshow] = useState(false)
  const [chatid, setChatid] = useState()

  const getdata = ()=>{
    axios.get("http://127.0.0.1:8000/chatuser/"+sessionStorage.getItem("userid"))
    .then(res => {
      // console.log(res.data)
      setSdata(res.data)})

    .catch(err => console.log(err))
   }
   
   useEffect(() => {
    getdata()
  }, [])
  const show = (id)=>{
    setChatshow(true)
    setChatid(id)
  }
  return (
    <div className='w-full '>
    <div className='h-full w-96 bg-white  border-r-2 border-black fixed z-50 ml-[252px]'>
      <div className='ml-5 mt-5'>
        <div className='flex'>
      <h1 className='text-3xl font-semibold'>Messages</h1>
      <p className='ml-44 text-[25px] font-bold mt-2'><RiMessage2Line/></p>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} className='mt-5 border-b-2 pl-5 font-mediumtext-lg rounded-xl w-[95%] py-4 bg-loww border-none outline-none' type="text" placeholder='Search' />
      </div>
      <hr  className='mt-5 border-black rounded-br-xl'/>
      <div className=' h-full w-96'>
      {

sdata.filter((data)=>{
    return search.toLowerCase() === ''
    ? data
    : data.name.toLowerCase().includes(search)    
}).map(((data, i) => 
           <div className='flex hover:bg-gray-100 rounded-xl py-2 w-[350px] mt-2 ml-4 border-black' key={i} onClick={()=>show(data.id)}>
            <div className='ml-5'>
            <Link ><img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='h-10 w-10 rounded-full '  alt="" /></Link>
            </div>
            <div className='ml-3'>
              <Link ><h1 className='font-semibold'>{data.name}</h1></Link>
              <Link ><p className='text-sm'>{data.username}</p></Link>
            </div>
            
           </div>
))}
      </div>
     
    </div>
     {
      chatshow?
      <ChatPage id={chatid}/>:""
    }
    </div>
  )
}

export default Searchchat