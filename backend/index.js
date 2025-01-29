import express from "express";
import dotenv from "dotenv";
import userrouter from "./route/userRoute.js";
import messageRoute from "./route/messageRoute.js";  // Import the message route
import connectDB from "./config/database.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import { app,server } from "./socket/socket.js";
import path from "path"

dotenv.config();

const _dirname =path.resolve()
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOption = {
  origin: `http://localhost:3000`,
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userrouter);
app.use("/api/v1/message", messageRoute);  // Use the message route

// For testing
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Secret Key:", process.env.SECRET_KEY);
console.log("Port:", process.env.PORT);

const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(_dirname,"/frontends/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(_dirname,"frontends","build","index.html"))
})
server.listen(PORT, () => {
  connectDB();  // Connect to the database
  console.log(`Server listening at ${PORT}`);
});