import  express  from "express";
import { createOrder, deleteOrder, getOrder, getOrderId, getOrders, updateOrder } from "../controllers/order.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";


const router = express.Router();

//CREATE
router.post("/:hotelid", createOrder);
//UPDATE
router.patch("/:id", verifyAdmin, updateOrder);
//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);

//GET
router.get("/history/:id", getOrder);
router.get("/:id", verifyAdmin ,getOrderId);

//GET ALL
router.get("/", getOrders);

export default router