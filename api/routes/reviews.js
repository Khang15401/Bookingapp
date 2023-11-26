import express from "express";
import Hotel from "../models/Hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createReview,
  deleteReview,
  deleteReviewHotel,
  deleteReviewHotel1,
  getReview,
  getReviewHotelId,
  getReviewId,
  getReviews,
  updateReview,
} from "../controllers/review.js";

const router = express.Router();

//CREATE
router.post("/", createReview);
//UPDATE
router.patch("/:id", updateReview);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteReviewHotel1);
// router.delete("/:id", deleteReview);

//GET
// router.get("/getall/:hotelid", getReviewHotelId);
router.get("/filter/:hotelid", getReviewHotelId);
router.get("/search/:id", getReview);
router.get("/:id", getReviewId);

// router.get("/service/:id", getOrderServices)
//GET ALL
router.get("/", getReviews);

export default router;
