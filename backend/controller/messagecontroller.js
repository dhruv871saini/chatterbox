import { Conversation } from "../model/conversationModel.js";
import { Message } from "../model/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id; // Logged-in user
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    gotConversation.messages.push(newMessage._id);
    await Promise.all([gotConversation.save(), newMessage.save()]);

    // Emit new message to receiver if online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      console.log("Message sent to:", receiverSocketId);
    }

    res.status(201).json({ newMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ message: "No conversation found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getMessagesBetweenUsers:", error);
    res.status(500).json({ error: error.message });
  }
};
