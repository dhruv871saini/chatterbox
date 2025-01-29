import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOtherUsers } from '../redux/userslice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get('http://localhost:5003/api/v1/user/');
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
