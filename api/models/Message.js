import mongoose from "mongoose";
const { Schema } = mongoose;

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: Array,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
