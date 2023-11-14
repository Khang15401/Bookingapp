import  express  from "express";
import  dotenv  from "dotenv";
import  mongoose  from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import ordersRoute from "./routes/orders.js"
import roomsRoute from "./routes/rooms.js"
import reviewsRoute from "./routes/reviews.js"
import servicesRoute from "./routes/services.js"
import conversationsRoute from "./routes/conversations.js"
import messagesRoute from "./routes/messages.js"
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config()
mongoose.set('strictQuery', true);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.")
    } catch (error) {
        throw error;
    }
};


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/services", servicesRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/conversations", conversationsRoute);
app.use("/api/messages", messagesRoute);

app.use((err, req, res, next) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(8800, ()=> {
    connect()
    console.log("Connected to backend.");
})