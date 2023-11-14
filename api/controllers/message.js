import Message from "../models/Message.js";

export const createMessage = async (req, res, next) => {
    const newMessage = new Message(req.body);
  
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
      next(err);
    }
  };


  export const getMessages = async (req, res, next) => {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  };
  
