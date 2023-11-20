import  express  from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotel1, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createService, deleteService, getService, getServices, getServices1, hiddenService, updateService } from "../controllers/service.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createService);
//UPDATE
router.patch("/:id", verifyAdmin, updateService);
//DELETE
router.delete("/:id", verifyAdmin, hiddenService);
//GET
router.get("/:id", getService);
router.get("/filter/:id", getServices);
//GET ALL
router.get("/", getServices1);
export default router