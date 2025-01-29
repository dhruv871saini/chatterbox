import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userslice';

const Login = () => {
  const dispatch= useDispatch()
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

  // Update the state when the input value changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5003/api/v1/user/login', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      dispatch(setAuthUser(res.data))
      // console.log('Login successful:', res);

      navigate('/home');
    } catch (error) {
      console.error('Error details:', error.response);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container-fluid frontback d-flex align-items-center justify-content-center vh-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-4 p-4 rounded zindex">
          <div className="display-5 text-center fw-bold text-white mt-4">Login</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group mt-4">
              <label className="fs-4 text-light">Username:</label>
              <input
                type="text"
                className="form-control border-light"
                placeholder="Enter username"
                name="userName"
                value={user.userName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3">
              <label className="fs-4 text-light">Password:</label>
              <input
                type="password"
                className="form-control border-light"
                placeholder="Enter password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mt-3 text-center">
              <p>
                <Link to="/signup" className="text-light">Don't have an account? Sign Up</Link>
              </p>
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary w-50">Login</button>
            </div>
          </form>
        </div>
      </div>
      {/* Toaster for displaying notifications */}
      <Toaster />
    </div>
  );
};

export default Login;
