import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaBars, FaPhoneAlt, FaVideo, FaVoicemail } from 'react-icons/fa';

const ChatPage = ({ id }) => {
    const [sdata, setSdata] = useState([]);
    const [name, setName] = useState([]);
    const [mess, setMess] = useState('');
    const [Receiver, setReceiver] = useState([]);
    const bottomRef = useRef(null);
    const [postall, setPostall] = useState([]);
    const [postallshare, setPostallshare] = useState([]);
    const [seen,setseen]=useState('')

    const getAllPosts = () => {
        axios.get("http://127.0.0.1:8000/getpostall")
            .then(res => setPostall(res.data))
            .catch(err => console.log(err));
    };

    const getAllPostsshare = () => {
        axios.get("http://127.0.0.1:8000/getpostallahare")
            .then(res => setPostallshare(res.data))
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getAllPosts();
        getAllPostsshare();
    }, []);

    const getdata = () => {
        axios.get("http://127.0.0.1:8000/getuserall")
            .then(res => setSdata(res.data))
            .catch(err => console.log(err));
    };

    const sendmess = async (id) => {
        if (mess.trim() !== "") {
            try {
                await fetch('http://127.0.0.1:8000/SendMess', {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        Message: mess,
                        SenderID: sessionStorage.getItem('userid'),
                        ReceiverID: id,
                    })
                });
                setMess('');
                ShowMess();
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Message is empty");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        sendmess(id);
    };

    const ShowMess = async () => {
        try {
            const userId = sessionStorage.getItem('userid');
            const Receiver = id;
            const response = await axios.get('http://127.0.0.1:8000/Message', {
                params: { userId, id: Receiver }
            });
            setReceiver(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getuser/" + id)
            .then(res => {
                function convertUTCToIST(utcString) {
                    return new Date(new Date(utcString).getTime() + 5.5 * 60 * 60 * 1000)
                        .toISOString()
                        .slice(0, 16)
                        .replace('T', ' ')
                        .replace('-','/').replace('-','/')
                }
                const utcTimestamp = res.data[0].Active_at;
                const istTimestamp = convertUTCToIST(utcTimestamp);
                console.log(istTimestamp)
                setseen(istTimestamp)

                setName(res.data)
            }

            )
            .catch(err => console.log(err));

    };

    useEffect(() => {
        showpost();

    }, [id]);

    useEffect(() => {
        ShowMess();
    }, [id]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [Receiver]);

    const isImage = (filename) => {
        if (!filename) return false;
        const extensions = ['jpg', 'jpeg', 'png', 'gif'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    const isVideo = (filename) => {
        if (!filename) return false;
        const extensions = ['mp4', 'webm', 'ogg'];
        return extensions.some(ext => filename.toLowerCase().endsWith(ext));
    };

    // New function to initiate a call
    const initiateCall = () => {
        const userId = sessionStorage.getItem('userid');
        // Logic to initiate the call using WebRTC or any other service
        // For example, redirecting to a call page or using a library
        console.log(`Initiating call to ${id} from ${userId}`);
        // Redirect to a call page or open a call modal
    };

    return (
        <div className='h-full w-[903px] bg-white border-l border-gray-300 fixed right-0 top-0 z-50'>
            <div className='w-full h-16 flex items-center justify-between px-4 bg-white shadow-md border-b border-gray-200'>
                {name.map((data, i) => (
                    <div className='flex items-center' key={i}>
                        <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='h-10 w-10 rounded-full' alt="" />
                        <div className='ml-5'>
                            <h1 className='font-semibold text-base text-black'>{data.name}</h1>
                            <p className='text-xs text-gray-500'>
                                {data.IsLogin === 0 ? (
                                    <span className='text-red-500'>Last Seen : {seen}</span>
                                ) : (
                                    <span className='text-green-500'>Online</span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}<div className='flex gap-10'>
                    <FaVideo className='text-xl  text-gray-600 cursor-pointer' onClick={initiateCall} />
                    <FaPhoneAlt className='text-xl  text-gray-600 cursor-pointer' onClick={initiateCall} />
                    <FaBars className='text-xl text-gray-600 cursor-pointer' />
                </div>
            </div>

            <div className='w-full h-[calc(100vh-160px)] overflow-auto overflow-y-scroll scrollbar-hide px-4 py-4 flex flex-col space-y-3'>
                {Receiver.map((item, i) => {
                    const post = postall.find((post) => item.pid === post.id);
                    return (
                        <div
                            key={i}
                            className={`w-auto max-w-[75%] mb-3 rounded-3xl text-sm ${item.SenderID == sessionStorage.getItem('userid') ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-black'}`}
                        >
                            {item.Message ? (
                                <p className="p-3">{item.Message}</p>
                            ) : post && (
                                isImage(post.photos) ? (
                                    <img
                                        src={`http://127.0.0.1:8000/uploads/${post.photos}`}
                                        alt=""
                                        className="w-60 object-cover h-96 items-center rounded-xl"
                                    />
                                ) : isVideo(post.photos) ? (
                                    <div>
                                        <video
                                            src={`http://127.0.0.1:8000/uploads/${post.photos}`}
                                            className="w-60 object-cover h-96 items-center rounded-xl"
                                            muted
                                            loop
                                            autoPlay
                                        />
                                    </div>
                                ) : null
                            )}
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className='w-full h-16 px-4 mt-2 bg-white border-t border-gray-200 flex items-center'>
                <input
                    type="text"
                    className='flex-grow h-10 mt-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Type a message...'
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                />
                <button
                    type="submit"
                    className='h-10 px-4 mt-3 ml-2 bg-blue-500 text-white font-semibold rounded-full'
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatPage;
