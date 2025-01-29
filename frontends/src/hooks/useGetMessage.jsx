import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMessage } from "../redux/messageSlice";
import toast from "react-hot-toast";

const useGetMessage = () => {
  const dispatch = useDispatch();
  const selectorUsers = useSelector((store) => store.user.selectorUsers);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectorUsers?._id) {
        toast.error("User ID is missing.");
        return;
      }

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:5003/api/v1/message/conversation/${selectorUsers._id}`
        );
        dispatch(setMessage(res.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [dispatch, selectorUsers?._id]);
};

export default useGetMessage;