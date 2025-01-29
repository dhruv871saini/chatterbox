// socketService.js
import { io } from "socket.io-client";

let socket;

export const initializeSocket = (userId) => {
  socket = io("http://localhost:5003", { query: { userId } });
  return socket;
};

export const getSocket = () => socket;