import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "./components/SocketService";
import { setgetOnlineUser } from "./redux/userslice";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const socket = initializeSocket(authUser._id);

      socket.on("getOnlineUser", (onlineUsers) => {
        dispatch(setgetOnlineUser(onlineUsers));
      });

      return () => socket.close();
    }
  }, [authUser, dispatch]);

  return (
    <div className="frontback">
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;