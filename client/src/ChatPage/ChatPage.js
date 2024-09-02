import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { RiMessage2Line } from 'react-icons/ri'
import { FaBars } from 'react-icons/fa'
const ChatPage = ({ id }) => {
    const [sdata, setSdata] = useState([])
    const [name, setName] = useState([])
    const [mess, setMess] = useState('')
    const [Sendermes, SetSendermes] = useState([])
    const [Receiver, SetReceiver] = useState([])
    //   console.log(id)

    const getdata = () => {
        axios.get("http://127.0.0.1:8000/getuserall")
            .then(res => {
                // console.log(res.data)
                setSdata(res.data)
            })
            .catch(err => console.log(err))
    }
    const sendmess = async (id) => {
        if (mess != "")
            try {
                await fetch('http://127.0.0.1:8000/SendMess',{
                    method: "post",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ Message: mess,
                        SenderID: sessionStorage.getItem('userid'),
                        ReceiverID: id })
                })

            } catch (error) {
                console.log(error)
            }
        else {
            alert("Message is empty");
        }
        ShowMess();
        setMess('');
    }

    const ShowMess = async () => {
        try {
            const userId = sessionStorage.getItem('userid');
            const Receiver = id;
            console.log(userId, Receiver)
            const response = await axios.get('http://127.0.0.1:8000/Message', {
                params: {
                    userId: userId,
                    id: Receiver
                }
            });
            console.log(response.data)
            SetReceiver(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getdata()
    }, [])
    const showpost = () => {
        axios.get("http://127.0.0.1:8000/getuser/" + id)
            .then(res => {
                setName(res.data)
                // console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        showpost()
    }, [id])
    useEffect(() => {
        ShowMess()
    }, [id])
    return (
        <div className='h-full w-[715px]  bg-white  border-r-2 border-black fixed z-50 ml-[629px] '>

            <div className='w-full h-16 flex items-center justify-between mt- bg-loww text-center'>
                {
                    name.map((data, i) => (
                        <div className='flex ml-5 items-center justify-center' key={i} >
                            <div className='mr-5'>
                                <img src={`http://127.0.0.1:8000/uploads/${data.photos}`} className='h-[45px] w-[45px] rounded-full' alt="" />
                            </div>
                            < div>
                                <h1 className='p-0 font-semibold'>{data.name}</h1>
                            </div>
                        </div>
                    ))} ;
                <div className='mr-10'><FaBars /></div>
            </div>

            <div className='w-[715px] overflow-auto h-[80%] flex flex-col'>
                {
                    Receiver.map((name, i) =>
                    (
                        <p className='w-[95%]  ml-5 float-left'>
                            <h1 className={`{${name.SenderID==sessionStorage.getItem('userid')?'incoming-msg float-right bg-green-500 mt-5  w-auto p-3 rounded-3xl':'outgoing-msg text-right float-left bg-red-500 w-auto mt-10 p-3 rounded-3xl'}}`}>{name.Message}</h1>
                        </p>
                    ))
                }
               
            </div>

            <div className='w-full h-[10%] bg-green-500 border-t-2 border-black'>
                <div>
                    <input type="text" className='w-[90%] h-16 font-medium pl-5 ' placeholder='Type Message Here..' onChange={(e) => setMess(e.target.value)} />
                    <button className='h-16 w-[10%] bg-blue-500 font-semibold text-white' onClick={(e) => sendmess(id)}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatPage