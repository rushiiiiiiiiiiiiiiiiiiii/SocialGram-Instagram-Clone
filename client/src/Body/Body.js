import React, { useEffect, useState } from 'react'
import Nav from './Nav/Nav';
import Nav2 from './Nav2/Nav2';
import Story from './Story/Story';
import Post from './Post/Post';
import Chat from './Chat/Chat';
import Drop from './Drop/Drop';
import { IoMdSearch } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentDialog from '../Commentdialog/CommentDialog';
const Body = () => {
  const [prof, setProf] = useState(false)
  const { postall, setPostall } = useState([])
  const [show, setShow] = useState(false);
  const adddrop = () => {
    setProf(true)
  }
  const adddrop2 = () => {
    setProf(false)
  }

  return (
    <div className='w-[100%] h-auto bg-white md:gap-[325px] flex'>
   <div>
    <Nav2/>
   </div>
    <div>
     <Story/>
     <Post/>
     </div>

  <div>
    <Chat />
  </div>
</div >
  )
}

export default Body