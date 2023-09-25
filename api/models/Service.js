import mongoose from "mongoose";
const { Schema } = mongoose;

const ServiceSchema = new mongoose.Schema(
  {
    servicename: {
      type: String,
      required: true,
      unique: true,
    },
    serviceprice: {
      type: Number,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
