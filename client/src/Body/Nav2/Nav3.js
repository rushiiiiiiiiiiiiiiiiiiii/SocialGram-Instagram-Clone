import React, { useEffect, useState, useRef } from 'react';
import { 
  FiInstagram, FiLogOut, FiSearch, FiVideo 
} from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { FaRegHeart, FaRegSquarePlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import Search from '../../Search/Search';
import Searchchat from '../../Searchchat/Searchchat';
import axios from 'axios';

const Nav3 = ({ themechange }) => {
  const nav = useNavigate();
  const [shows, setShows] = useState(false);
  const [showschat, setShowschat] = useState(false);
  const [file, setFile] = useState('');
  const userid = sessionStorage.getItem('userid');

  const toggleSearch = () => {
    setShowschat(false);
    setShows(!shows);
  };

  const logout = async () => {
    await fetch(`http://127.0.0.1:8000/logout/${userid}`, { method: 'post' });
    sessionStorage.removeItem('userid');
    nav('/login');
  };

  const fetchUserData = () => {
    axios.get(`http://127.0.0.1:8000/getuser/${userid}`)
      .then(res => setFile(res.data[0].photos))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUserData();
  }, [userid]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="minimized-nav bg-white md:fixed border-r border-gray-300 h-full">
        <div className="logo mt-6 mb-10">
          <FiInstagram className="icon mx-auto text-2xl text-blue-500" />
        </div>

        {/* Navigation Icons */}
        <ul className="nav-icons space-y-2">
          <Link to="/home">
            <li className="nav-icon">
              <IoHomeOutline className="text-2xl" />
            </li>
          </Link>
          <li className="nav-icon" onClick={toggleSearch}>
            <FiSearch className="text-2xl" />
          </li>
          <Link to="/explore">
            <li className="nav-icon">
              <MdOutlineExplore className="text-2xl" />
            </li>
          </Link>
          <Link to="/reelshow">
            <li className="nav-icon">
              <FiVideo className="text-2xl" />
            </li>
          </Link>
          <Link to="/chat">
            <li className="nav-icon">
              <RiMessage2Line className="text-2xl" />
            </li>
          </Link>
          <Link to="/notification">
            <li className="nav-icon">
              <FaRegHeart className="text-2xl" />
            </li>
          </Link>
          <Link to={`/create/${userid}`}>
            <li className="nav-icon">
              <FaRegSquarePlus className="text-2xl" />
            </li>
          </Link>
          <Link to={`/prof/${userid}`}>
            <li className="nav-icon">
              <img
                src={`http://127.0.0.1:8000/uploads/${file}`}
                className="w-10 h-10 rounded-full mx-auto"
                alt="Profile"
              />
            </li>
          </Link>
        </ul>

        {/* Logout Button */}
        <div onClick={themechange} className="mt-10">
          <FiLogOut className="icon mx-auto text-2xl hover:text-red-500 cursor-pointer" />
        </div>
      </div>

      {/* Modals */}
      {shows && <Search />}
      {showschat && <Searchchat />}
    </div>
  );
};

export default Nav3;
