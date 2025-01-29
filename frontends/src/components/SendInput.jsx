import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { setMessage } from '../redux/messageSlice';
const SendInput = () => {
  const dispatch=useDispatch();
  const {messages}=useSelector((store)=>store.message) 
  const {selectorUsers}=useSelector((store)=>store.user) 
  const [message, setmessage] = useState("")
  
  
  const submithandle=async(e)=>{
    e.preventDefault()
    // alert(message)
    try {
     const res=await axios.post(`https://chatterbox-1-oum0.onrender.com/api/v1/message/send/${selectorUsers?._id}`,{message},{
      headers:{
        "Content-Type":"application/json"
      },withCredentials:true
     })
        dispatch(setMessage([...messages,res?.data?.newMessage]))
    } catch (error) {
      console.log(error)
    }
    setmessage("")
  }
  return (
    <form onSubmit={submithandle} className="px-4 my-3">
      <div className="w-full position-relative">
        <input
        value={message}
        onChange={(e)=>setmessage(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="form-control text-sm rounded-lg p-3   border-0"
        />
        <button type="submit" className="position-absolute top-50 translate-middle-y end-0 me-3 btn btn-link">
          <IoSend size={20} />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
