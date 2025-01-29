import React from 'react';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import OtherUsers from './OtherUsers';

const Other2 = () => {
  
  const otherUsers = useSelector(store => store.user.otherUsers);
  useGetOtherUsers()
  if (!otherUsers) return;

  
  return (  
    <div className="overflow-auto" style={{ maxHeight: '400px' }}>
      {
        otherUsers.map((user)=>{
          return <OtherUsers key={user._id} user={user}/>
        })
      }
    </div>
  );  
};

export default Other2;
