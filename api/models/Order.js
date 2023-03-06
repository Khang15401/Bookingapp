import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
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
        default: false,
    },
},
{timestamps:true}
);

export default mongoose.model("Order", OrderSchema)