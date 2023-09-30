import  express  from "express";
import {deleteOrder, getOrder, getOrderId, getOrders, updateOrder, cancleOrder, createOrder, getOrderServices} from "../controllers/order.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", createOrder);
//UPDATE
router.patch("/:id", updateOrder);
router.patch("/cancle/:id", cancleOrder)
//DELETE
router.delete("/:id", verifyAdmin, deleteOrder);
//GET
router.get("/history/:id", getOrder);
router.get("/:id", getOrderId);

router.get("/service/:id", getOrderServices)
// router.post("/create-payment-intent/:hotelid", intent)

//GET ALL
router.get("/", getOrders);

export default router