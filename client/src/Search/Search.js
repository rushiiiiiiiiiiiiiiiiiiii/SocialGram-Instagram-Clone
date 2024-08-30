import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
const Search = () => {

  const[sdata,setSdata]= useState([])
  const [search,setSearch]= useState('')


  const getdata = ()=>{
    axios.get("http://127.0.0.1:8000/getuserall")
    .then(res => {
      console.log(res.data)
      setSdata(res.data)})
    .catch(err => console.log(err))
   }
   
   useEffect(() => {
    getdata()
  }, [])
  return (
    <div className='h-full w-96 bg-white border-r-2  border-black fixed z-50 ml-[245px] rounded-br-2xl rounded-tr-2xl'>
      <div className='ml-5 mt-5'>
          <div className='flex'>
      <h1 className='text-3xl font-semibold'>Search</h1>
      <p className='ml-56 text-[25px] font-bold mt-2'><FiSearch/></p>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} className='mt-5 border-b-2 pl-5 font-mediumtext-lg rounded-xl w-[95%] py-4 bg-loww border-none outline-none' type="text" placeholder='Search' />
      </div>
      <hr  className='mt-5 border-black rounded-br-xl'/>
      <div className=' h-full w-96'>
      {

sdata.filter((data)=>{
    return search.toLowerCase() === ''
    ? ""
    : data.name.toLowerCase().includes(search)    
}).map(((data, i) => 
           <div className='flex hover:bg-loww py-2 border-r-2 border-black' key={i}>
            <div className='ml-5'>
            <Link to={`/prof/${data.id}`}><img src="/image/prof.jpg" className='h-10 w-10 rounded-full '  alt="" /></Link>
            </div>
            <div className='ml-3'>
              <Link to={`/prof/${data.id}`}><h1 className='font-semibold'>{data.name}</h1></Link>
              <Link to={`/prof/${data.id}`}><p className='text-sm'>{data.username}</p></Link>
            </div>
            
           </div>
))}
      </div>
    </div>
  )
}

export default Search