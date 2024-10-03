import logo from './logo.svg';
import './App.css';
import Body from './Body/Body';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Start from './Start/Start';
import Prof from './Prof/Prof';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Editprof from './Editprof/Editprof';
import Create from './Create/Create';
import CommentDialog from './Commentdialog/CommentDialog';
import Demo from './Body/Post/Demo';
import Reelsshow from './Reelsshow/Reelsshow';
import Explore from './Explore/Explore';
import Notification from './Notification/Notification';
import Searchchat from './Searchchat/Searchchat';
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path='/home' element={<Body/>}/>
  <Route path='/register' element={<Register/>} />
  <Route path='/login' element={<Login/>} />
  <Route path='/' element={<Start/>} />
  <Route path='/prof/:userid' element={<Prof/>} />
  <Route path='/profedit' element={<Editprof/>} />
  <Route path='/reelshow' element={<Reelsshow/>} />
  <Route path='/create/:userid' element={<Create/>} />
  <Route path='/explore' element={<Explore/>} />
  <Route path='/notification' element={<Notification/>} />
  <Route path='/chat' element={<Searchchat/>} />
  {/*<Route path='/commentpg/:id' element={<CommentDialog/>} />*/}

</Routes>
{/* <ToastContainer autoClose={1500}/> */}
<Toaster/>
</BrowserRouter>
  )
}

export default App;
