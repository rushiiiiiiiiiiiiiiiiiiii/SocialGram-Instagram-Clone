import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiMessage2Line } from 'react-icons/ri';
import ChatPage from '../ChatPage/ChatPage';
import Nav2 from '../Body/Nav2/Nav2';
import Nav3 from '../Body/Nav2/Nav3';

const Searchchat = () => {
  const [sdata, setSdata] = useState([]);
  const [search, setSearch] = useState('');
  const [chatshow, setChatshow] = useState(false);
  const [chatid, setChatid] = useState(null);
  const [hoveredUser, setHoveredUser] = useState(null); // Track hovered user

  // Fetch chat users
  const getdata = () => {
    axios
      .get(`http://127.0.0.1:8000/chatuser/${sessionStorage.getItem('userid')}`)
      .then((res) => {
        setSdata(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdata();
  }, []);

  const show = (id) => {
    setChatshow(true);
    setChatid(id);
    moveToTop(id); // Move the selected user to the top
  };

  // Move the user to the top of the list
  const moveToTop = (id) => {
    setSdata((prevData) => {
      const updatedList = prevData.filter((user) => user.id !== id); // Remove selected user
      const selectedUser = prevData.find((user) => user.id === id); // Find selected user
      return [selectedUser, ...updatedList]; // Place user at the top
    });
  };

  return (
    <div className='w-full flex'>
      <Nav3 />

      {/* Sidebar */}
      <div className='h-full w-96 bg-white border-r border-gray-300 fixed z-50 ml-[80px] overflow-y-scroll scrollbar-hide'>
        <div className='p-5'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold text-black'>Messages</h1>
            <RiMessage2Line className='text-2xl font-bold text-gray-600' />
          </div>

          {/* Search Input */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='mt-4 border border-gray-300 rounded-full pl-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            type='text'
            placeholder='Search'
          />
        </div>

        <hr className='border-gray-300' />

        {/* Chat List */}
        <div className='h-full w-full px-5 mt-1'>
          {sdata
            .filter((data) =>
              search.toLowerCase() === '' ||
              data.name.toLowerCase().includes(search)
            )
            .map((data, i) => (
              <div
                key={i}
                onClick={() => show(data.id)}
                onMouseEnter={() => setHoveredUser(data.id)} // Track hovered user
                onMouseLeave={() => setHoveredUser(null)} // Reset on mouse leave
                className={`flex items-center py-3 pl-3 rounded-lg cursor-pointer ${
                  hoveredUser === data.id ? 'bg-gray-100' : ''
                }`}
              >
                <img
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  className='h-12 w-12 rounded-full object-cover'
                  alt={data.name}
                />
                <div className='ml-4'>
                  <h1 className='font-semibold text-base text-black'>{data.name}</h1>
                  <p className='text-sm text-gray-500'>{data.username}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Default Message View */}
      <div className='w-[870px] h-[100vh] ml-[500px] flex flex-col items-center justify-center'>
        <div className='ml-40 p-0 flex flex-col items-center justify-center'>
          <RiMessage2Line className='text-6xl border-1 border-black' />
          <h1 className='text-lg font-semibold mt-1'>Your Message</h1>
          <p>Send a message to start a chat.</p>
          <button className='px-8 py-2 rounded-xl mt-3 text-white bg-blue-500'>
            Send Message
          </button>
        </div>
      </div>

      {/* Chat Page */}
      {chatshow && <ChatPage id={chatid} />}
    </div>
  );
};

export default Searchchat;
