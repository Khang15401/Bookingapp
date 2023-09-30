import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    userName: {
        type: String,
        required: true
    },
    imgUser:{
        type: String,
    },
    hotelId:{
        type: String,
    },
    nameHotel: {
        type: String,
        required: true
    },
    positive: {
        type: String,
    },
    negative: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    roomId:{
        type: String,
        required: true,
    },
    titleRoom: {
        type: String,
        require: true,
    },
    timeReview:{
        type: String,
        required: true,
    },
},
{timestamps:true}
);

export default mongoose.model("Review", ReviewSchema)