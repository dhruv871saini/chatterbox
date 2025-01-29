// socketService.js
import { io } from "socket.io-client";

let socket;

export const initializeSocket = (userId) => {
  socket = io("https://chatterbox-1-oum0.onrender.com", { query: { userId } });
  return socket;
};

export const getSocket = () => socket;