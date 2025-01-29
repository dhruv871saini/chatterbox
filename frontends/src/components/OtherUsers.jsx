import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectorUsers } from "../redux/userslice";
import "./OtherUsers.css";

const OtherUsers = ({ user }) => {
  const dispatch = useDispatch();
  const selectorUsers = useSelector((state) => state.user.selectorUsers);
  const getOnlineUser = useSelector((state) => state.user.getOnlineUser);

  // const isOnline = Array.isArray(getOnlineUser) && getOnlineUser.includes(user?._id);
const isOnline = getOnlineUser.includes(user._id)
  const selectedUserHandler = (user) => {
    dispatch(setSelectorUsers(user));
  };

  return (
    <div>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`d-flex align-items-center gap-2 p-2 hover-effect rounded cursor-pointer ${
          selectorUsers?._id === user?._id ? "bg-light text-dark" : ""
        }`}
      >
        <div className="avatar-container position-relative">
          <div className="rounded-circle overflow-hidden" style={{ width: "50px", height: "50px" }}>
            <img src={user?.profilePic} alt="Profile" className="img-fluid" />
          </div>
          {isOnline ? <div className="online-indicator"></div> :""}
        </div>
        <div className="user-info d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-between">
            <p className="mb-0 user-name">{user?.fullName}</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default OtherUsers;
