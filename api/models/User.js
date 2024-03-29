import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    hotelId: {
      type: String,
    },
    role: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    locked: {
      type: String,
      default: "",
    },
    lockReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
