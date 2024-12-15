import React, { useState, useEffect } from 'react';
import { MdCancel } from 'react-icons/md';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ShareDialog = ({ setOpenuser, postid }) => {
  const [sdata, setSdata] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const SenderID = sessionStorage.getItem("userid");
  const [postall, setPostall] = useState([]);

  const getAllPosts = () => {
    axios.get("http://127.0.0.1:8000/getpostall")
      .then(res => setPostall(res.data))
      .catch(err => console.log(err));
  };
  useEffect(()=>{
    getAllPosts();
  },[])
  const getdata = () => {
    axios
      .get('http://127.0.0.1:8000/chatuser/' + SenderID)
      .then((res) => setSdata(res.data))
      .catch((err) => console.log(err));
  };
  const sharepost = () => {
    if (!selectedUser) {
        alert("Please select a user to share the post.");
        return;
    }

    const payload = {
        pid: postid,
        SenderID: SenderID,
        ReceiverID: selectedUser,
        Message: null
    };

    axios.post("http://127.0.0.1:8000/SendMess/", payload)
        .then((res) => {
            console.log(res.data);
            setOpenuser(false); 

        })
        .catch((err) => console.log(err));
};


  useEffect(() => {
    getdata();

  }, []);

  const toggleSelectUser = (id) => {
    setSelectedUser(prev => (prev === id ? null : id)); // Toggle selection
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl md:max-w-2xl h-3/4 sm:h-4/5 flex flex-col">
        <MdCancel
          onClick={() => setOpenuser(false)}
          className="absolute top-4 right-4 text-3xl text-gray-500 cursor-pointer hover:text-gray-700"
        />
        <div className="p-5 border-b border-gray-300">
          <h1 className="text-xl font-semibold text-black">Share Post</h1>
        </div>
        <div className="p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search users..."
          />
        </div>
        <div className="flex-1 overflow-y-scroll scrollbar-hide px-5">
          {sdata
            .filter((data) =>
              search === '' ? true : data.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((data, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-3 hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => toggleSelectUser(data.id)} // Only allow single selection
              >
                {selectedUser === data.id ? (
                  <MdCheckBox className="text-blue-500" />
                ) : (
                  <MdCheckBoxOutlineBlank className="text-gray-400" />
                )}
                <img
                  src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                  className="h-12 w-12 rounded-full object-cover"
                  alt={data.name}
                />
                <div>
                  <h1 className="font-semibold text-black">{data.name}</h1>
                  <p className="text-sm text-gray-500">{data.username}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="p-4 border-t border-gray-300">
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
            onClick={sharepost}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
