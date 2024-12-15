import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profilepost from './Profilepost';
import { FaComment, FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa';

const Postdisplay = ({ id }) => {
  const [postdata, setPostdata] = useState([]);
  const [postall, setPostall] = useState([]);
  const [postalllike, setPostalllike] = useState([]);
  const [postallcomment, setPostallcomment] = useState([]);
  const [profpost, setProfpost] = useState();
  const [open, setOpen] = useState(false);
  const [showopen, setShowopen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const showus = (id) => {
    setProfpost(id);
    setOpen(true);
    setShowopen(id);
  };

  const showpost = () => {
    axios
      .get('http://127.0.0.1:8000/getpost/' + id)
      .then((res) => {
        setPostdata(res.data);
        setPostall(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const showlike = (pid) => {
    axios
      .get('http://127.0.0.1:8000/getlikec/' + pid)
      .then((res) => {
        setPostalllike(res.data.length);
        console.log(res.data)
      
      })
      .catch((err) => console.log(err));
  };
  const showcomment = () => {
    axios
      .get('http://127.0.0.1:8000/getcomment/' + id)
      .then((res) => {
        setPostallcomment(res.data.length);
        console.log(res.data

        )
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    showpost();
    showlike();
    showcomment();
    console.log(postall);
  }, [id]);

  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some((ext) => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className='flex gap-x-4 gap-y-4 -ml- flex-wrap mt-4'>
      {open && (
        <Profilepost
          className='bg-black bg-opacity-50'
          setOpen={setOpen}
          postid={showopen}
        />
      )}

      {postdata.length > 0 ? (
        postdata
          .slice()
          .reverse()
        
          .map((data, i) =>  
            
           (
            <div key={i} className='relative cursor-pointer group'>
             
              {isImage(data.photos) ? (
                <img
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  alt=""
                  className='object-cover cursor-pointer w-60 h-64'
                  onClick={showlike(data.pid)}
                />
              ) : isVideo(data.photos) ? (
                <video
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  loop
                  muted={true}
                  autoPlay
                  className='object-cover cursor-pointer w-60 h-64'
                />
              ) : null}

              <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div  className='flex gap-14  text-white ml-[18%] text-[22px] mt-[45%]' >
                <div className='flex gap-2 '><FaRegHeart className='mt-[5px]'/>{postalllike}</div> 
                <div className='flex gap-2 '><FaRegComment className='mt-[5px]'/>{postallcomment}</div>
                </div>
              </div>
            </div>
          ))
      ) : (
        <div>
          <h1 className='text-3xl font-semibold ml-56 mt-24'>No Post Posted Yet</h1>
        </div>
      )}
    </div>
  );
};

export default Postdisplay;
