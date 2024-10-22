import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav2 from '../Body/Nav2/Nav2'; // Assuming this is the navigation bar

const Explore = () => {
  const [postdata, setPostdata] = useState([]);
  const [postall, setPostall] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => {
        setPostall(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleVideoClick = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
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
    <div className="w-full h-auto bg-white text-black">
   
      <Nav2 />

      <div className="ml-72 mt-3 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {postall.length > 0 ? (
          postall.slice().reverse().map((data, i) => (
            <div className="relative group" key={i}>
       
              {isImage(data.photos) ? (
                <img
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  alt="post"
                  className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              ) : isVideo(data.photos) ? (
                <video
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  muted={true}
                  onClick={handleVideoClick}
                  autoPlay
                  loop={true}
                  className="w-full h-full object-cover rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                />
              ) : null}

              {/* Overlay with Actions (Likes, Comments) */}
              {/* <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 h-full w-full flex items-center justify-center transition-opacity duration-300">
                <div className="text-white flex space-x-6 text-lg font-semibold">
                  <span>❤️ 100</span>
                  <span>💬 20</span>
                </div>
              </div> */}
            </div>
          ))
        ) : (
          <p>No posts to display</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
