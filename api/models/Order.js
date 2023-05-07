import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
        // required: true
    },
    nameHotel: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
    },
    city:{
        type: String,
    },
    rooms:{
        type: String,
    },
    status:{
        type: String,
        default: "Chưa Nhận Phòng",
    },
    
},
{timestamps:true}
);

export default mongoose.model("Order", OrderSchema)