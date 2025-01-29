import React,{useState} from 'react'
import { LuSearch } from "react-icons/lu";
import Other2 from './Other2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectorUsers } from '../redux/userslice';
import { setMessage } from '../redux/messageSlice';

const Slider = () => {
  const {otherUsers}=useSelector((store)=>store.user)
  const [search, setsearch] = useState("")
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logouthandler= async()=>{
  try {
    const res = await axios.get("http://localhost:5003/api/v1/user/logout")
    navigate("/");
    toast.success(res.status.message)
    console.log(res)
    toast.success(res.data.message);
    dispatch(setAuthUser(null));
    dispatch(setMessage([]));
    dispatch(setOtherUsers(null)); 
    dispatch(setSelectorUsers([]));
} catch (error) {
    console.log(error);
}
}
  const searchHandle=(e)=>{
    e.preventDefault();
    const conversationUser=otherUsers?.find((user)=>user.fullName.toLowerCase().includes(search.toLowerCase()))
    if(conversationUser){
      dispatch(setOtherUsers([conversationUser]))
    }else{
      
      toast.error("User not found")
    }
  }
  return (
    <div className='zindex '>
        <form onSubmit={searchHandle} className=' d-flex gap-2-' action="">
            <input type="text" placeholder='Search...' value={search} onChange={(e)=>setsearch(e.target.value)} className='form-control border-light'
            />
            <button type='submit' className='btn btn-primary'><LuSearch />
</button>
        </form>
        <Other2/>
        <div className='mt-3'>
          <button onClick={logouthandler} className='btn btn-danger'>Logout </button>
        </div>
    </div>
  )
  }

export default Slider
