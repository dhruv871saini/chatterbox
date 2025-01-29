import express from "express";
import { sendMessage, getMessagesBetweenUsers } from "../controller/messagecontroller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Route for sending a message
router.route("/send/:id").post(isAuthenticated, sendMessage);

// Route for fetching all messages between two users
router.route("/conversation/:id").get(isAuthenticated, getMessagesBetweenUsers);

export default router; 
