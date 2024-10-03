import React, { useEffect, useState, useRef } from 'react';
import Nav2 from '../Body/Nav2/Nav2';
import axios from 'axios';
import { FaHeart, FaComment, FaShare, FaBookmark } from 'react-icons/fa';
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from 'react-icons/bs';

const Reelsshow = () => {
  const [postall, setPostall] = useState([]);
  const [sdata, setSdata] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has interacted with the page
  const videoRefs = useRef([]); // To store references of video elements

  const getallpost = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        const videoPosts = res.data.filter(post => isVideo(post.photos));
        setPostall(videoPosts);
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

  const isVideo = (filename) => {
    const extensions = ['mp4', 'webm', 'ogg'];
    return extensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  // Use Intersection Observer to track videos in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index'), 10);
        const videoElement = videoRefs.current[index];

        if (entry.isIntersecting) {
          setCurrentVideoIndex(index);

          if (hasInteracted && videoElement) {
            videoElement.muted = false; // Unmute only if user has interacted and the video element exists
            videoElement.play();
          } else if (videoElement) {
            videoElement.muted = true; // Ensure it's muted initially
            videoElement.play();
          }
        } else if (videoElement) {
          videoElement.muted = true;
          videoElement.pause();
        }
      });
    }, {
      threshold: 0.5, // Video is considered visible if 50% of it is in view
    });

    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      if (videoRefs.current) {
        videoRefs.current.forEach((videoRef) => {
          if (videoRef) observer.unobserve(videoRef);
        });
      }
    };
  }, [postall, hasInteracted]);

  // Handle user interaction (e.g., clicking anywhere on the page)
  const handleUserInteraction = () => {
    setHasInteracted(true); // This enables unmuting videos after interaction
  };

  return (
    <div className="w-full h-screen text-white" onClick={handleUserInteraction}>
      <div className="flex">
        <Nav2 />

        <div className="flex-1 ml-40 h-[100vh] snap-y snap-mandatory overflow-y-scroll scrollbar-hide relative">
          {
            postall.slice().reverse().map((data, i) => {
              const user = sdata.find(user => user.id === data.sid);
              return (
                <div className="snap-center gap-y-5 flex justify-center items-center h-screen w-full relative" key={i}>
                  <div className="relative w-[400px] h-[580px] max-w-[400px] max-h-[600px] bg-black rounded-lg">
                    <video
                      ref={(el) => videoRefs.current[i] = el}
                      data-index={i}
                      src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                      muted // Always start videos muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-[580px] object-cover rounded-lg"
                    />

                    <div className="absolute top-4 right-4 z-10">
                      {currentVideoIndex === i && !videoRefs.current[i]?.muted ? (
                        <BsFillVolumeUpFill className="text-white text-2xl" />
                      ) : (
                        <BsFillVolumeMuteFill className="text-white text-2xl" />
                      )}
                    </div>

                    <div className="absolute bottom-10 left-4 text-white">
                      <div className="flex items-center mb-2">
                        <img
                          src={`http://127.0.0.1:8000/uploads/${user?.photos}`}
                          alt="profile"
                          className="w-10 h-10 rounded-full border-2 border-white mr-3"
                        />
                        <div className='flex'>
                          <h1 className="font-semibold">{user?.name}</h1>
                          <button className="text-sm font-medium border border-white rounded-full px-3 py-1 ml-2">
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
                      <FaBookmark className="text-2xl cursor-pointer hover:scale-110 transition-transform" />
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
