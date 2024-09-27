import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2300); // Change the time as needed

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className='flex items-center justify-center h-screen bg-white'>
      <div className='flex flex-col items-center'>
        {/* Instagram Logo (Add your logo path) */}
        <img 
          src='/instapng.png' // Replace with your logo path
          alt='Instagram Logo' 
          className='w-24 h-24  mt-44' 
        />
                {/* <h1 className="text-center -mt-1 text-3xl font-bold mb-2">SocialGram</h1> */}


        {/* Loading Animation */}
        {/* <div className='flex items-center mb-4  mt-5'>
          <div className='w-3 h-3 bg-black rounded-full animate-bounce mr-2'></div>
          <div className='w-3 h-3 bg-black rounded-full animate-bounce mr-2'></div>
          <div className='w-3 h-3 bg-black rounded-full animate-bounce'></div>
        </div> */}

        {/* Optional START Button (will not be used since it's auto-redirecting) */}
        <div className='pt-40'>
        <h1 className="text-center -mt-1 text-3xl font-bold mb-2" >SocialGram</h1>
 
        <h1 className='bg-transparent border-white border-2 font-semibold hover:bg-white  text-black px-10 py-3'>
          From RA
        </h1>
        </div>

      </div>
    </div>
  );
};

export default Start;
