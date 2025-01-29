import React, { useState } from 'react';
import {  Link,useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios';
const Signup = () => {
  const [user, setUser] = useState({
    fullName: '',
    userName: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const navigate=useNavigate()
  // Update the state when the input value changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const Submitform = async(e)=>{
  e.preventDefault()
try {
  const res=await axios.post(`https://chatterbox-1-oum0.onrender.com/api/v1/user/register`,user,{
    headers:{
      'Content-Type':'application/json'
    },
    withCredentials:true
  })
  console.log(res);
  
if(res.data.success){
  toast.success(res.data.message)
  navigate("/")
  
}
} catch (error) {
  toast.error(error.response.data.message)

  console.log(error);
  
}
// if(validationForm){
//   toast.success("Sign up successfull")
//   console.log(user);
//   }else{
//     toast.error("All feild require to signup ")
// }
  }

  return (
    <div className="container-fluid frontback d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6 col-lg-4 p-4 rounded zindex">
        <Toaster/>
          <h1 className="text-center fw-bold text-white mb-4">Sign Up</h1>
<form action=""onSubmit={Submitform}>
  
<div className="form-group mb-3">
            <label className="fs-5 text-light" htmlFor="fullName">Name:</label>
            <input
              value={user.fullName}
              onChange={handleInputChange}
              type="text"
              className="form-control  border-light"
              id="fullName"
              name="fullName"
              placeholder="Enter name"
            />
          </div>

          <div className="form-group mb-3">
            <label className="fs-5 text-light" htmlFor="userName">Username:</label>
            <input
              value={user.userName}
              onChange={handleInputChange}
              type="text"
              className="form-control  border-light"
              id="userName"
              name="userName"
              placeholder="Enter username"
            />
          </div>

          <div className="form-group mb-3">
            <label className="fs-5 text-light" htmlFor="password">Password:</label>
            <input
              value={user.password}
              onChange={handleInputChange}
              type="password"
              className="form-control  border-light"
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <div className="form-group mb-3">
            <label className="fs-5 text-light" htmlFor="confirmPassword">Confirm Password:</label>
            <input
              value={user.confirmPassword}
              onChange={handleInputChange}
              type="password"
              className="form-control  border-light"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
            />
          </div>

          <div className="form-group mb-4 text-light">
            <label className="fs-5 text-light">Gender:</label>
            <div className="form-check form-check-inline ms-3">
              <input
                value="male"
                onChange={handleInputChange}
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                checked={user.gender === 'male'}
              />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                value="female"
                onChange={handleInputChange}
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                checked={user.gender === 'female'}
              />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>
          </div>

          <div className="text-center">
            <button type='submit' className="btn btn-primary w-50">Sign Up</button>
          </div>

          <div className="mt-3 text-center">
            <Link to="/" className="text-light">Already have an account? Login</Link>
          </div>
</form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
