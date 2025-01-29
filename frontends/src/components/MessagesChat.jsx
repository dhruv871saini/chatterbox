import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./MessagesChat.css";

const MessagesChat = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectorUsers } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [ message]);
  // useGetMessage()
  return (<>

    <div
      ref={scroll}
      className={`d-flex ${
        message?.senderId === authUser?._id
          ? "justify-content-end"
          : "justify-content-start"
      } align-items-start mb-3 fs-5`}
      
    >
      {/* Avatar */}
      {message?.senderId !== authUser?._id && (
        <div className="me-2">
          <img
            alt="User avatar"
            src={selectorUsers?.profilePic}
            className="rounded-circle"
            width="40"
            height="40"
          />
        </div>
      )}

      {/* Message content */}
      <div className="d-flex flex-column">
        {/* Timestamp */}
        <div className="text-muted small mb-1">
        </div>

        {/* Message bubble */}
        <div
          className={`p-2 rounded-3 ${
            message?.senderId === authUser?._id
              ? "bg-primary text-white"
              : "bg-light text-dark"
          } font-s`}
          style={{
            maxWidth: "300px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {message?.message}
        </div>
      </div>

      {/* Avatar for authUser */}
      {message?.senderId === authUser?._id && (
        <div className="ms-2">
          <img
            alt="User avatar"
            src={authUser.profilePic}
            className="rounded-circle"
            width="40"
            height="40"
          />
        </div>
      )}
    </div>
  </>
  );
};

export default MessagesChat;
