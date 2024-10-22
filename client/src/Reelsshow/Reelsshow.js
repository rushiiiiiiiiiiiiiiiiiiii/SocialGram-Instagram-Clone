import React, { useEffect, useState } from 'react';
import Nav2 from '../Body/Nav2/Nav2';
import axios from 'axios';
import { FaHeart, FaComment, FaShare, FaPlay, FaSave, FaRegSave, FaBookmark } from 'react-icons/fa'; // Add any necessary icons
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs'; // For mute/unmute

const Reelsshow = () => {
  const [postall, setPostall] = useState([]);
  const [sdata, setSdata] = useState([]);
  const [muted, setMuted] = useState(true);

  const getallpost = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);
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
    getallpost();
    getdata();
  }, []);

  const isImage = (filename) => {
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
  };

  return (
    <div className="w-full h-screen text-white">
      <div className="flex">
        <Nav2 />

   
        <div className="flex-1 ml-40 h-[100vh] snap-y snap-mandatory overflow-y-scroll scrollbar-hide relative">
          {
            postall.slice().reverse().map((data, i) => {
              const user = sdata.find(user => user.id === data.sid);
              return (
                <div className="snap-center gap-y-5 flex justify-center items-center h-screen w-full relative" key={i}>
                  
                  <div className="relative w-[400px] h-[580px] max-w-[400px] max-h-[600px] bg-black rounded-lg">
                   
                    {isImage(data.photos) ? (
                      <img
                        src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                        alt=""
                        className="w-full h-[580px] object-cover rounded-lg"
                      />
                    ) : isVideo(data.photos) ? (
                      <video
                        src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                        muted={muted}
                        onClick={handleVideoClick}
                        autoPlay
                        loop
                        className="w-full h-[580px] object-cover rounded-lg"
                      />
                    ) : null}

                    <div className="absolute top-4 right-4 z-10">
                      {muted ? (
                        <BsFillVolumeMuteFill
                          className="text-white text-2xl cursor-pointer"
                          onClick={handleMuteToggle}
                        />
                      ) : (
                        <BsFillVolumeUpFill
                          className="text-white text-2xl cursor-pointer"
                          onClick={handleMuteToggle}
                        />
                      )}
                    </div>

                    <div className="absolute bottom-10 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <img
                          src={`http://127.0.0.1:8000/uploads/${user?.photos}`}
                          alt=""
                          className="w-10 h-10 rounded-full border-2 border-white mr-3"
                        />
                        <div className='flex'>
                          <h1 className="font-semibold">{user?.name}</h1>
                          <button className="text-sm font-medium border border-white rounded-full px-3 py-1 ml-2 ">
                            Follow
                          </button>
                        </div>
                      </div>
                      <p className="text-md ml-1">{data.caption}</p>
                    </div>

                    <div className="absolute right-4 bottom-20 text-white flex flex-col items-center space-y-6">
                      <FaHeart className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
                      <FaComment className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
                      <FaShare className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
                      <FaBookmark  className="text-2xl cursor-pointer hover:scale-110 transition-transform" />

                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Reelsshow;
