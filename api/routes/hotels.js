import  express  from "express";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotel1, getHotelReviews, getHotelRooms, getHotels, updateHotel, updateHotel1 } from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);
//UPDATE
router.patch("/:id", verifyAdmin, updateHotel);
router.patch("/addReview/:id", updateHotel1);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
router.get("/review/:id", getHotelReviews);
router.get("/filter/:id",verifyAdmin, getHotel1)
export default router