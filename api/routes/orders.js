import  express  from "express";
// import {deleteOrder, getOrder, getOrderId, getOrders, updateOrder, intent} from "../controllers/order.js";
import {deleteOrder, getOrder, getOrderId, getOrders, updateOrder, cancleOrder, createOrder} from "../controllers/order.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", createOrder);
//UPDATE
router.patch("/:id", verifyAdmin, updateOrder);
router.patch("/cancle/:id", cancleOrder)
//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);

//GET
router.get("/history/:id", getOrder);
router.get("/:id", verifyAdmin ,getOrderId);
// router.post("/create-payment-intent/:hotelid", intent)
//Payment Paypal


//GET ALL
router.get("/", getOrders);

export default router