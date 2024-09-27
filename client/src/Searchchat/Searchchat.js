import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiMessage2Line } from 'react-icons/ri';
import ChatPage from '../ChatPage/ChatPage';

const Searchchat = () => {
  const [sdata, setSdata] = useState([]);
  const [search, setSearch] = useState('');
  const [chatshow, setChatshow] = useState(false);
  const [chatid, setChatid] = useState(null);

  const getdata = () => {
    axios
      .get('http://127.0.0.1:8000/chatuser/' + sessionStorage.getItem('userid'))
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
  };

  return (
    <div className='w-full flex'>
      {/* Sidebar */}
      <div className='h-full w-96 bg-white border-r border-gray-300 fixed z-50 ml-[252px] overflow-y-scroll scrollbar-hide'>
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

        <div className='h-full w-full px-5'>
          {sdata
            .filter((data) => {
              return search.toLowerCase() === ''
                ? data
                : data.name.toLowerCase().includes(search);
            })
            .map((data, i) => (
              <div
                className='flex items-center py-3 pl-3 hover:bg-gray-100 rounded-lg cursor-pointer'
                key={i}
                onClick={() => show(data.id)}
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
      {chatshow && <ChatPage id={chatid} />}
    </div>
  );
};

export default Searchchat;
