import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import Storyupload from '../../Storyupload/Storyupload';
import Storyview from './Storyview';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Story = () => {
  const [showaddst, setShowaddst] = useState(false);
  const [storyd, setStoryd] = useState([]);
  const [storyalluser, setStoryalluser] = useState([]);
  const [name, setName] = useState();
  const [uname, setUame] = useState();
  const [photo, setphoto] = useState();
  const [sdata, setSdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [showcom, setShowcom] = useState();

  const sliderRef = useRef(null); // Ref to track the slider container

  const id = sessionStorage.getItem("userid");

  const getdata = () => {
    axios.get("http://127.0.0.1:8000/getuserall")
      .then(res => setSdata(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const showpost = () => {
    axios.get(`http://127.0.0.1:8000/getuser/${id}`)
      .then(res => {
        setName(res.data[0].name);
        setUame(res.data[0].username);
        setphoto(res.data[0].photos);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    showpost();
  }, [id]);

  const getstoryall = () => {
    axios.get(`http://127.0.0.1:8000/getstory/${id}`)
      .then(res => setStoryd(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getstoryall();
  }, []);

  const getstoryalluser = () => {
    axios.get(`http://127.0.0.1:8000/followerStory/${id}`)
      .then(res => setStoryalluser(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getstoryalluser();
  }, []);

  const showaddstory = () => setShowaddst(true);

  const showus = (postid) => {
    setOpen(true);
    setShowcom(postid);
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -500, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 500, behavior: 'smooth' });
  };
  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  return (
    <div className="relative">
      <div className="absolute left-[10px] z-10 top-[50px] cursor-pointer bg-gray-100 rounded-full p-2" onClick={scrollLeft}>
        <FaArrowLeft size={24} />
      </div>
      <div className="slider-container story -mb-1 mt-6 flex gap-3 ml-1 overflow-x-scroll scrollbar-hide w-[633px] pb-5 border-b-2" ref={sliderRef}>
        {showaddst ? <Storyupload setShowaddst={setShowaddst} getstory={getstoryall} /> : ""}

        {open ? <Storyview setShowcom={setOpen} getstoryid={showcom} /> : ""}

        <div className="box-story w-24 h-40 bg-loww rounded-xl ml-[1px] relative cursor-pointer">
          {storyd.length > 0 ? (
            storyd.map((data, i) => {
              const user = sdata.find(user => user.id === parseInt(data.sid));
              return (
                <div className="w-24 h-40" key={i}>
                  <img
                    src={`http://127.0.0.1:8000/uploads/${user?.photos}`}
                    className="h-[50px] w-[50px] border-4 border-gray-500 rounded-full z-10 absolute top-1 left-2"
                    alt=""
                  />
                  {/* <img
                    src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                    alt=""
                    className="w-24 h-40 object-cover rounded-xl"
                  /> */}
                  {isImage(data.photos) ? (
                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} alt="" className='w-24 h-40 object-cover rounded-xl' />
              ) : isVideo(data.photos) ? (
                <div>
                  <video
                    src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                    className='w-24 h-40 object-cover rounded-xl'
               
                    muted={true}
                  />
                
                </div>
              ) : null}


                </div>
              );
            })
          ) : (
            <div className="mt-[px]">
              <img src={`http://127.0.0.1:8000/uploads/${photo}`} className="h-10 w-10 rounded-full z-10 absolute top-2 left-2" alt="" />
              <h1 className="text ml-7 border-gray-300 rounded border-none font-semibold cursor-pointer p-1 w-[50px] mt-[90px] text-center text-3xl">
                <FaPlus onClick={showaddstory} />
              </h1>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {storyalluser !== "no followers found" ? (
            storyalluser.map((data, i) => {
              const user = sdata.find(user => user.id === parseInt(data.sid));
              return (
                <div key={i} className="box-story w-24 flex gap-3 h-40 bg-loww rounded-xl ml-[1px] cursor-pointer">
                  <div className="w-24 h-40 relative" onClick={() => showus(data.id)}>
                    <img
                      src={`http://127.0.0.1:8000/uploads/${user?.photos}`}
                      className="h-[50px] w-[50px] rounded-full border-4 border-red-500 z-10 absolute top-1 left-2"
                      alt=""
                    />
                    <img
                      src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                      alt=""
                      className="w-24 h-40 object-cover rounded-xl"
                    />
                  </div>
                </div>
              );
            })
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="absolute right-[70px] top-[50px] cursor-pointer bg-gray-100 rounded-full p-2" onClick={scrollRight}>
        <FaArrowRight size={24} />
      </div>
    </div>
  );
};

export default Story;
