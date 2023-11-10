import  express  from "express";
import { createRoom, deleteRoom, getRoom, getRooms, removeRoomAvailability, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);
//UPDATE
router.patch("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);
//UPDATE ROOM
router.patch("/reservation/:id", removeRoomAvailability);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET
router.get("/:id", getRoom);
//GET ALL
router.get("/", getRooms);

export default router