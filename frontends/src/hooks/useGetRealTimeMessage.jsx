import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../components/SocketService";
import { setMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((store) => store.message);

  useEffect(() => {
    const socket = getSocket();

    const handleNewMessage = (newMessage) => {
      dispatch(setMessage([...messages, newMessage]));
      
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [dispatch, messages]);
};

export default useGetRealTimeMessage;