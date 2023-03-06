import  express  from "express";
import { createOrder, getOrder } from "../controllers/order.js";
import Hotel from "../models/Hotel.js";


const router = express.Router();

//CREATE
router.post("/:hotelid", createOrder);
//UPDATE

//DELETE

//GET
router.get("/:id", getOrder);
//GET ALL

export default router