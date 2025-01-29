import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userID = socket.handshake.query.userId;// it collect user id from frontend current user 
  if (userID) {
    userSocketMap[userID] = socket.id;
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  }

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userID) {
      delete userSocketMap[userID];
      io.emit("getOnlineUser", Object.keys(userSocketMap));
    }
  });
});

export { app, io, server };