import  express  from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotel1, getHotelRooms, getHotels, updateHotel } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { createService, deleteService, getService, getServices, updateService } from "../controllers/service.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createService);
//UPDATE
router.patch("/:id", verifyAdmin, updateService);
//DELETE
router.delete("/:id", verifyAdmin, deleteService);
//GET
router.get("/:id", getService);
//GET ALL
router.get("/", getServices);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);
// router.get("/:id",verifyAdmin, getHotel1)
export default router