import express from "express";
const router = express.Router();
import Message from "../models/Message.js";
import { createMessage, getMessages } from "../controllers/message.js";
import { getConversation } from "../controllers/conversation.js";

//add
router.post("/", createMessage);

//get
router.get("/:conversationId", getMessages);

export default router;
