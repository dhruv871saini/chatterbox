import React from 'react';
import SendInput from './SendInput';
import ChatContainer from './ChatContainer';
import { useSelector } from 'react-redux';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
const MessageContainer = () => {
  useGetOtherUsers()
  const selectorUsers = useSelector((store) => store.user?.selectorUsers);
   const getOnlineUser = useSelector((state) => state.user.getOnlineUser);
  
    // const isOnline = Array.isArray(getOnlineUser) && getOnlineUser.includes(user?._id);
  const isOnline = getOnlineUser.includes(selectorUsers._id)

  console.log("Selector Users:", selectorUsers);

  return (
    <>
      {selectorUsers && Object.keys(selectorUsers).length > 0 ? (
        <div className="message-container" 
        // style={{maxHeight:" 2000px"}}
        >
        <div className="d-flex flex-column" style={{ minWidth: '558px'}}>
          {/* Message Header */}
          <div className="d-flex align-items-center gap-2 bg-secondary rounded text-white px-4 py-2 mb-2">
            <div className="avatar position-relative">
              <div className="rounded-circle overflow-hidden" style={{ width: '50px', height: '50px' }}>
                <img
                  src={selectorUsers?.profilePic || '/path/to/fallback/image.jpg'} // Fallback image
                  alt="Profile"
                  className="img-fluid"
                />
              </div>
            </div>

            {/* User Information */}
            <div className="d-flex flex-column flex-grow-1">
              <div className="d-flex justify-content-between gap-2">
                <p className="mb-0">{selectorUsers?.fullName || 'User Name'}</p>
                 {/* Fallback */}
              </div>
                {isOnline? <div className='fs-5 text-dark'> Online</div>:""}
            </div>
          </div>

          <ChatContainer />
          <SendInput />
        </div>
        </div>
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minWidth: '558px', minHeight: "480px" }}>
          <h1>Start conversation...</h1>
        </div>
      )}
    </>
  );
}

export default MessageContainer;
