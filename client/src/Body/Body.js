// import React, { useEffect, useState } from 'react'
// import Nav from './Nav/Nav';
// import Nav2 from './Nav2/Nav2';
// import Story from './Story/Story';
// import Post from './Post/Post';
// import Chat from './Chat/Chat';
// const Body = () => {

// return (
//   <>

//     <div className='w-[100%] bg-white  dark:bg-black h-auto md:gap-[325px] flex'>
//       <div>
//         <Nav2 />
//       </div>
//       <div >
//         <Story />
//         <Post />
//       </div>
//       <div>
//         <Chat />
//       </div>
//     </div >
//   </>
// )
// }

// export default Body


import React, { useEffect, useState } from 'react';
import Nav2 from './Nav2/Nav2';
import Story from './Story/Story';
import Post from './Post/Post';
import Chat from './Chat/Chat';

const Body = () => {
  const [theme, setTheme] = useState('light'); // Default theme is light

  // Toggle dark mode based on the theme state
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      
      <div className='w-full bg-white  dark:bg-black h-auto flex justify-between'>
        <div className='w-[20%]'>
          <Nav2 themechange={handleThemeSwitch}/>
        </div>
        <div  className='md:w-[55%]   md:ml-14'>
          <Story className='hidden' />
          <Post />
        </div>
        <div className='w-[27%]'>
          <Chat />
        </div>
      </div>
    </>
  );
};

export default Body;
