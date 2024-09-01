// import React from 'react'
// import { FaPlus } from 'react-icons/fa'
// import axios from 'axios'
// import { useState, useEffect } from "react";
// import Storyupload from '../../Storyupload/Storyupload';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// const Story = () => {
//   const [showaddst, setShowaddst] = useState(false)
//   const [storyd, setStoryd] = useState([])
//   const [storyalluser, setStoryalluser] = useState([])
//   var id = sessionStorage.getItem("userid")
//   const [name, setName] = useState()
//   const [uname, setUame] = useState()
//  const[photo,setphoto]=useState()
//   const[sdata,setSdata]= useState([])


//   const getdata = ()=>{
//     axios.get("http://127.0.0.1:8000/getuserall")
//     .then(res => {
//       console.log(res.data)
//       setSdata(res.data)})
//     .catch(err => console.log(err))
//    }
   
//    useEffect(() => {
//     getdata()
//   }, [])
//   const userid = sessionStorage.getItem("userid")
//   const showpost = ()=>{
//     axios.get("http://127.0.0.1:8000/getuser/"+ userid)
//     .then(res=>{
//         setName(res.data[0].name)
//         setUame(res.data[0].username)
//         setphoto(res.data[0].photos)
//     })
//     .catch(err=>console.log(err))
// }
// useEffect(()=>{
//     showpost()

// },[userid])
//   const getstoryall = () => {
//     axios.get("http://127.0.0.1:8000/getstory/" + id)
//       .then(res => {
//         setStoryd(res.data)
//       })
//       .catch(err => console.log(err))
//   }
//   useEffect(() => {
//     getstoryall()
//   }, [])
//   const getstoryalluser = () => {
//     axios.get("http://127.0.0.1:8000/getstoryall/"+id)
//       .then(res => {
//         setStoryalluser(res.data)
//       })
//       .catch(err => console.log(err))
//   }
//   useEffect(() => {
//     getstoryalluser()
//   }, [])
//   const showaddstory = () => {
//     setShowaddst(true)
//   }
  
//   return (
//     <div className="slider-container story mt-6 flex gap-3 overflow-x-hidden w-[638px]">
//       {
//         showaddst ?
//           <Storyupload setShowaddst={setShowaddst} getstory={getstoryall} /> : ""
//       }

//       <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative cursor-pointer">
//         {
//           storyd.map((data, i) =>{
//           const user= sdata.find(user=> user.id === data.sid)

//           return(
//             <div className='w-24 h-40' key={i}>
//         <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} className="h-[50px] w-[50px]  rounded-full z-10 absolute top-1 left-2" alt="" />

//               <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
//             </div>
//       )})
//     }
//         {/* <h1 className='-mt-11 ml-2 text-[14px] font-semibold text-black'>{name}</h1> */}
    
//         {
//         storyd.length <= 0 ?

//             <div className='mt-[px]'>
//         <img src={`http://127.0.0.1:8000/uploads/${photo}`} className="h-10 w-10 rounded-full z-10 absolute top-2 left-2" alt="" />

//               <h1 class="text  ml-7 border-gray-300 rounded border-none  font-semibold cursor-pointer p-1 w-[50px] mt-[90px] text-center text-3xl"><FaPlus onClick={showaddstory} /></h1>

//               {/* <h1 className='mt-4 text-center  p-0 text-sm'>{name}</h1> */}
//             </div>:""
//           }
         
       
//       </div>
 

//       <div className="box-story w-24 flex gap-3  h-40 bg-loww rounded-xl ml-[1px] cursor-pointer">
//         {
//           storyalluser.slice().reverse().map((data, i) =>{
//             const user = sdata.find(user=> user.id === data.sid)
//               return(
//             <div key={i}>
//             <div className='w-24 h-40 relative'>
//               <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`}  className='h-[50px] w-[50px] rounded-full border-4 border-red-500 z-10 absolute top-1 left-2' alt="" />
//               <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
            
//               {/* <h1  className='h-10 w-10 rounded-full z-50 pt-20 absolute top-2 left-2' alt="" >Rushikesh Arote</h1> */}
//             </div>
//             </div>
//           )})
//         }
//         </div>

//     </div>



//   )
// }

// export default Story


import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Storyupload from '../../Storyupload/Storyupload';

const Story = () => {
  const [showaddst, setShowaddst] = useState(false);
  const [storyd, setStoryd] = useState([]);
  const [storyalluser, setStoryalluser] = useState([]);
  const [sdata, setSdata] = useState([]);
  const [name, setName] = useState();
  const [uname, setUame] = useState();
  const [photo, setphoto] = useState();
  
  const id = sessionStorage.getItem("userid");

// Slick slider settings
const settings = {
  dots: true,
  infinite: false,
  slidesToShow: 7,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

  useEffect(() => {
    const getdata = () => {
      axios.get("http://127.0.0.1:8000/getuserall")
        .then(res => setSdata(res.data))
        .catch(err => console.log(err));
    };
    getdata();
  }, []);

  useEffect(() => {
    const showpost = () => {
      axios.get(`http://127.0.0.1:8000/getuser/${id}`)
        .then(res => {
          setName(res.data[0].name);
          setUame(res.data[0].username);
          setphoto(res.data[0].photos);
        })
        .catch(err => console.log(err));
    };
    showpost();
  }, [id]);

    const getstoryall = () => {
      axios.get(`http://127.0.0.1:8000/getstory/${id}`)
        .then(res => setStoryd(res.data))
        .catch(err => console.log(err));
    };
    useEffect(()=>{
    getstoryall();
  }, []);

    const getstoryalluser = () => {
      axios.get(`http://127.0.0.1:8000/getstoryall/${id}`)
        .then(res => setStoryalluser(res.data))
        .catch(err => console.log(err));
    }
  useEffect(() => {

    getstoryalluser();
  }, []);

  const showaddstory = () => {
    setShowaddst(true);
  };

  return (
    <div className="slider-container story mt-6 flex gap-3 overflow-x-hidden w-[638px]">
      {showaddst && <Storyupload setShowaddst={setShowaddst} getstory={getstoryall} />}
      
      <Slider {...settings}>
        <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative cursor-pointer">
          {storyd.map((data, i) => {
            const user = sdata.find(user => user.id === data.sid);
            return (
              <div className='w-24 h-40' key={i}>
                <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} className="h-[50px] w-[50px] rounded-full z-10 absolute top-1 left-2" alt="" />
                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
              </div>
            );
          })}
          {storyd.length <= 0 && (
            <div className='mt-[px]'>
              <img src={`http://127.0.0.1:8000/uploads/${photo}`} className="h-10 w-10 rounded-full z-10 absolute top-2 left-2" alt="" />
              <h1 className="text ml-7 border-gray-300 rounded border-none font-semibold cursor-pointer p-1 w-[50px] mt-[90px] text-center text-3xl">
                <FaPlus onClick={showaddstory} />
              </h1>
            </div>
          )}
        </div>

        <div className="box-story w-24 flex gap-3 h-40 bg-loww rounded-xl ml-[1px] cursor-pointer">
          {storyalluser.slice().reverse().map((data, i) => {
            const user = sdata.find(user => user.id === data.sid);
            return (
              <div key={i}>
                <div className='w-24 h-40 relative'>
                  <img src={`http://127.0.0.1:8000/uploads/${user?.photos}`} className='h-[50px] w-[50px] rounded-full border-4 border-red-500 z-10 absolute top-1 left-2' alt="" />
                  <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
                </div>
              </div>
            );
          })}
        </div>
      </Slider>
    </div>
  );
};

export default Story;
