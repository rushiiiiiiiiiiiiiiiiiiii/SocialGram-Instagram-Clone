// import React, { useEffect, useState } from 'react';
// import Nav2 from '../Body/Nav2/Nav2';
// import axios from 'axios';

// const Notification = () => {
//   const [likenotification, setLikenotification] = useState([]);
//   const [postall, setPostall] = useState([]);
//   const [sdata, setSdata] = useState([]);
//   const id = sessionStorage.getItem("userid");

//   const getallpost = () => {
//     axios.get("http://127.0.0.1:8000/getpostall")
//       .then(res => {
//         setPostall(res.data);
//       })
//       .catch(err => console.log(err));
//   };

//   const likenot = async () => {
//     await axios.get("http://127.0.0.1:8000/getliknoot/" + id)
//       .then(res => {
//         setLikenotification(res.data);
//         console.log(res.data);
//       })
//       .catch(err => console.log(err));
//   };

//   const getdata = () => {
//     axios.get("http://127.0.0.1:8000/getuserall")
//       .then(res => {
//         setSdata(res.data);
//       })
//       .catch(err => console.log(err));
//   };

//   useEffect(() => {
//     likenot();
//     getallpost();
//     getdata();
//   }, []);

//   const isImage = (filename) => {
//     const extensions = ['jpg', 'jpeg', 'png', 'gif'];
//     return extensions.some(ext => filename.toLowerCase().endsWith(ext));
//   };

//   const isVideo = (filename) => {
//     const extensions = ['mp4', 'webm', 'ogg'];
//     return extensions.some(ext => filename.toLowerCase().endsWith(ext));
//   };

//   const timeAgo = (date) => {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);

//     let interval = Math.floor(seconds / 31536000);
//     if (interval > 1) return `${interval} years ago`;

//     interval = Math.floor(seconds / 2592000);
//     if (interval > 1) return `${interval} months ago`;

//     interval = Math.floor(seconds / 86400);
//     if (interval > 1) return `${interval} days ago`;

//     interval = Math.floor(seconds / 3600);
//     if (interval > 1) return `${interval} hours ago`;

//     interval = Math.floor(seconds / 60);
//     if (interval > 1) return `${interval} minutes ago`;

//     return "Just now";
//   };

//   return (
//     <div className="w-full h-screen bg-[#FAFAFA] text-black">
//       <div className="flex">
//         <Nav2 />
//         <div className="ml-80 w-[900px] h-screen p-5 overflow-y-scroll scrollbar-hide">
//           <h2 className="text-3xl font-bold mb-5">Notifications</h2>
//           <div className="space-y-4">
//             {likenotification.length > 0 ? (
//               likenotification.slice().reverse().map((data, i) => {
//                 const post = postall.find((post) => data.pid === post.id);
//                 const likedByUser = sdata.find((user) => data.sid === user.id);

//                 return (
//                   <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-200">
//                      {isImage(data.photos) ? (
//                 <img src={`http://127.0.0.1:8000/uploads/${post.photos}`} alt="" className='w-10 object-contain h-10 items-center ml-5 pb-4' />
//               ) : isVideo(data.photos) ? (
//                 <div>
//                   <video
//                     src={`http://127.0.0.1:8000/uploads/${post.photos}`}
//                     className='w-[10px] object-contain h-10 items-center ml-5 pb-4' 
//                     loop 
//                     autoPlay
//                     muted={true}
//                   />
//                 </div>
//               ) : null}

//                     <img
//                       src={`http://127.0.0.1:8000/uploads/${likedByUser.photos}`}
//                       alt="User Avatar"
//                       className="rounded-full w-10 h-10 mr-4"
//                     />
//                     <div className="flex flex-col">
//                       <span className="font-semibold text-lg">{likedByUser.name}</span>
//                       <span className="text-gray-600">liked your post</span>
//                       <span className="text-gray-400 text-sm">{timeAgo(data.date)}</span>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notification;
import React, { useEffect, useState } from 'react';
import Nav2 from '../Body/Nav2/Nav2';
import axios from 'axios';
import { FaCircle, FaDotCircle, FaRegDotCircle } from 'react-icons/fa';

const Notification = () => {
  const [likenotification, setLikenotification] = useState([]);
  const [postall, setPostall] = useState([]);
  const [sdata, setSdata] = useState([]);
  const id = sessionStorage.getItem("userid");

  const getallpost = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);
      })
      .catch(err => console.log(err));
  };

  const likenot = async () => {
    await axios.get("http://127.0.0.1:8000/getliknoot/" + id)
      .then(res => {
        setLikenotification(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  const getdata = () => {
    axios.get("http://127.0.0.1:8000/getuserall")
      .then(res => {
        setSdata(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    likenot();
    getallpost();
    getdata();
  }, []);

  const isImage = (filename) => {
    if (!filename) return false; // If filename is undefined, return false
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    if (!filename) return false; // If filename is undefined, return false
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    return "Just now";
  };

  return (
    <div className="w-full h-screen bg-[#FAFAFA] text-black">
      <div className="flex">
        <Nav2 />
        <div className="ml-80 w-[900px] h-screen p-5 overflow-y-scroll scrollbar-hide">
          <h2 className="text-3xl font-bold mb-5">Notifications</h2>
          <div className="space-y-4">
            {likenotification.length > 0 ? (
              likenotification.slice().reverse().map((data, i) => {
                const post = postall.find((post) => data.pid === post.id);
                const likedByUser = sdata.find((user) => data.sid === user.id);

                return (
                  <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg shadow hover:shadow-lg transition duration-200">
                   
<div className='flex -mt-[8px]'>
                    {likedByUser && (
                      <img
                        src={`http://127.0.0.1:8000/uploads/${likedByUser.photos}`}
                        alt="User Avatar"
                        className="rounded-full mt-2 w-10 h-10 mr-4"
                      />
                    )}
                    <div className="flex mt-[14px]">
                      <span className="font-semibold text-base flex mr-2">{likedByUser ? likedByUser.name : "Unknown User"}</span>
                      <span className="text-gray-600  mr-2 ">liked your post.  </span>
                      <span className="text-gray-400 text-sm mt-[3px]">{timeAgo(data.date)}</span>
                    </div>
                    </div>
                    <div className='ml-[00px] -mb-4 flex items-center justify-center'>
                    {post && isImage(post.photos) ? (
                        
                      <img 
                        src={`http://127.0.0.1:8000/uploads/${post.photos}`} 
                        alt="" 
                        className="w-20 object-cover h-20 items-center ml-5 pb-4" 
                      />
                    ) : post && isVideo(post.photos) ? (
                      <div>
                        <video
                          src={`http://127.0.0.1:8000/uploads/${post.photos}`}
                          className="w-20 object-cover h-20 items-center ml-5 pb-4" 
                          
                          muted={true}
                        />
                      </div>
                    ) : null}
                    </div>
                  </div>
                  
                );
              })
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
