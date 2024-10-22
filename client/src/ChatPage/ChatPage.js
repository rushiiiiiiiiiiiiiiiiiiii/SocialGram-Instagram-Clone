import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';

const ChatPage = ({ id }) => {
    const [sdata, setSdata] = useState([]);
    const [name, setName] = useState([]);
    const [mess, setMess] = useState('');
    const [Receiver, SetReceiver] = useState([]);

    const getdata = () => {
        axios.get("http://127.0.0.1:8000/getuserall")
            .then(res => {
                setSdata(res.data);
            })
            .catch(err => console.log(err));
    };

    const sendmess = async (id) => {
        if (mess !== "") {
            try {
                await fetch('http://127.0.0.1:8000/SendMess', {
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        Message: mess,
                        SenderID: sessionStorage.getItem('userid'),
                        ReceiverID: id
                    })
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Message is empty");
        }
        ShowMess();
        setMess('');
    };

    const ShowMess = async () => {
        try {
            const userId = sessionStorage.getItem('userid');
            const Receiver = id;
            const response = await axios.get('http://127.0.0.1:8000/Message', {
                params: { userId, id: Receiver }
            });
            SetReceiver(response.data);
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
                setName(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        showpost();
    }, [id]);

    useEffect(() => {
        ShowMess();
    }, [id]);

    return (
        <div className='h-full w-[730px] bg-white border-l border-gray-300 fixed right-0 top-0 z-50'>
            {/* Header */}
            <div className='w-full h-16 flex items-center justify-between px-4 bg-white shadow-md border-b border-gray-200'>
                {name.map((data, i) => (
                    <div className='flex items-center' key={i}>
                        <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='h-10 w-10 rounded-full' alt="" />
                        <div className='ml-5'>
                            <h1 className='font-semibold text-base text-black'>{data.name}</h1>
                            <p className='text-xs text-gray-500'>
                                {data.IsLogin === 0 ? <span className='text-red-500'>Offline</span> : <span className='text-green-500'>Online</span>}
                            </p>
                        </div>
                    </div>
                ))}
                <FaBars className='text-xl text-gray-600' />
            </div>

            <div className='w-full h-[calc(100vh-160px)] overflow-auto overflow-y-scroll scrollbar-hide px-4 py-4 flex flex-col space-y-3 '>
                {Receiver.map((message, i) => (
                    <div key={i} className={`w-auto max-w-[75%] mb-3 p-3 rounded-3xl text-sm ${message.SenderID == sessionStorage.getItem('userid') ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-black'}`}>
                        {message.Message}
                    </div>
                ))}
            </div>

            <div className='w-full h-16 px-4 mt-2 bg-white border-t border-gray-200 flex items-center'>
                <input
                    type="text"
                    className='flex-grow h-10 mt-3 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Type a message...'
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                />
                <button className='h-10 px-4 mt-3 ml-2 bg-blue-500 text-white font-semibold rounded-full' onClick={() => sendmess(id)}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;
