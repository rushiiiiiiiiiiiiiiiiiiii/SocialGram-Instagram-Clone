import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdCancel } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Storyview = ({ setShowcom, getstoryid }) => {
    const [storyd, setStoryd] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track current story index
    const [isPlaying, setIsPlaying] = useState(true); // Track if stories are auto-advancing

    const getstoryall = () => {
        axios.get(`http://127.0.0.1:8000/getstorypic/${getstoryid}`)
            .then(res => {
                setStoryd(res.data);
                if (res.data.length > 0) {
                    setCurrentIndex(0); // Reset to first story
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getstoryall();
    }, [getstoryid]); // Added getstoryid to dependency array to fetch new stories when it changes

    useEffect(() => {
        let timer;
        if (isPlaying && storyd.length > 0) {
            timer = setInterval(nextStory, 3000); // Change story every 3 seconds
        }
        return () => clearInterval(timer); // Cleanup interval on component unmount or when isPlaying changes
    }, [isPlaying, storyd]);

    const nextStory = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % storyd.length); // Loop back to start
    };

    const prevStory = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + storyd.length) % storyd.length); // Loop to end
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setShowcom(false)}>
                <MdCancel />
            </button>

            {storyd.length > 0 ? (
                <div className="relative flex items-center">
                    <button
                        className="absolute left-5 text-white text-4xl bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition"
                        onClick={() => {
                            prevStory();
                            setIsPlaying(false); // Stop auto-playing on manual navigation
                        }}
                    >
                        <FaChevronLeft />
                    </button>

                    <div className="w-[500px] h-[600px] overflow-hidden shadow-lg rounded-lg">
                        <img
                            src={`http://127.0.0.1:8000/uploads/${storyd[currentIndex].photos}`}
                            alt="Story"
                            className="object-cover w-full h-full transition-transform duration-300"
                        />
                    </div>

                    <button
                        className="absolute right-5 text-white text-4xl bg-gray-800 rounded-full p-2 hover:bg-gray-700 transition"
                        onClick={() => {
                            nextStory();
                            setIsPlaying(false); // Stop auto-playing on manual navigation
                        }}
                    >
                        <FaChevronRight />
                    </button>
                </div>
            ) : (
                <p className="text-white text-xl">No story available</p>
            )}
        </div>
    );
};

export default Storyview;
