import  express  from "express";
const router = express.Router();
import Conversation from "../models/Conversation.js";
import { createConversation, getConversation } from "../controllers/conversation.js";

// new Conversation

router.post("/", createConversation);
// get Conversation of a user
router.get("/:userId", getConversation);



export default router