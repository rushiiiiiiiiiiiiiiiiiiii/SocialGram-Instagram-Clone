import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [sdata, setSdata] = useState([]);
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(true); // State to track visibility of the search container
  const searchRef = useRef(); // Reference to the search container

  const getdata = () => {
    axios.get('http://127.0.0.1:8000/getuserall')
      .then(res => {
        setSdata(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getdata();
  }, []);

  // Handle click outside the search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsVisible(false); // Close the search container
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    isVisible && ( 
      <div ref={searchRef} className="h-full text-black w-96 bg-white border-r-2 border-black fixed z-50 ml-[252px] rounded-br-2xl rounded-tr-2xl">
        <div className="ml-5 mt-5 fixed">
          <div className="flex">
            <h1 className="text-3xl font-semibold">Search</h1>
            <p className="ml-56 text-[25px] font-bold mt-2"><FiSearch /></p>
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 border-b-2 pl-5 font-normal text-lg rounded-xl w-[95%] py-3 bg-loww border-none outline-none"
            type="text"
            placeholder="Search"
          />
        </div>
        <hr className="mt-36 border-black rounded-br-xl" />
        <div className="h-full w-96 overflow-y-scroll scrollbar-hide" >
          {sdata
            .filter((data) => {
              return search.toLowerCase() === ''
                ? ''
                : data.name.toLowerCase().includes(search);
            })
            .map((data, i) => (
              <Link to={`/prof/${data.id}`} key={i}>
                <div className="flex hover:bg-gray-100 rounded-xl py-2 w-[350px] mt-2 ml-4 border-black">
                  <div className="ml-5">
                    <img
                      src={`http://127.0.0.1:8000/uploads/${data.photos}`}
                      className="h-10 w-10 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-semibold">{data.name}</h1>
                    <p className="text-sm">{data.username}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    )
  );
};

export default Search;
