import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    hotelId:{
        type: String,
    },
    userId: {
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    nameHotel: {
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    rooms:{
        type: String,
        required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
    photoRoom:{
        type: String,
        require: true,
    },
    titleRoom: {
        type: String,
        require: true,
    },
    quantity:{
        type: String,
        require: true,
    },
    status:{
        type: String,
        default: "Chưa nhận phòng",
    },
    checkIn:{
        type: String,
        required: true,
    },
    checkOut:{
        type: String,
        required: true,
    },
},
{timestamps:true}
);

export default mongoose.model("Order", OrderSchema)