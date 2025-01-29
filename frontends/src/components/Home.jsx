import React, { useEffect } from 'react'
import Slider from './Slider'
import Message from './Message'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {authUser}= useSelector(store=> store.user)
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/")
    }
  }, [])
  
  return (
    <div className='d-flex text-light justify-content-center align-items-center  '>
    <Slider/>
    <Message/>
    
    </div>
  ) 
}

export default Home
