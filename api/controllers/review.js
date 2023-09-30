import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import User from "../models/User.js";
import Service from "../models/Service.js"
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
import Review from "../models/Review.js";

export const createReview = async (req, res, next) => {
  try {
    // const hotel = await Hotel.findById(req.params.hotelid);
    // const user = await User.findById(req.body.userId);
    // const newReview = new Review(req.body);
    const newReview = new Review({
      hotelId: req.body.hotelId,
      nameHotel: req.body.nameHotel,
      imgUser: req.body.imgUser,
      roomId: req.body.roomId,
      userId: req.body.userId,
      titleRoom: req.body.titleRoom,
      userName: req.body.userName,
      positive: req.body.positive,
      negative: req.body.negative,
      rating: req.body.rating,
      timeReview: req.body.timeReview,
    });
    // console.log({...req.body})
    const saveReview = await newReview.save();
    res.status(200).json(saveReview);
  } catch (err) {
    console.log(err);
  }
};
// GET REVIEW User ID
export const getReview = async(req, res, next)=>{
  try{
      const review = await Review.find({userId: req.params.id});
      res.status(200).json(review)
  }catch(err){
      next(err);
  }
}
// GET REVIEW BY ID
export const getReviewId = async(req, res, next)=>{
  try{
      const review = await Review.findById(req.params.id);
      res.status(200).json(review)
  }catch(err){
      next(err);
  }
}
export const getReviews = async(req, res, next)=>{
  try{
      const review = await Review.find();
      res.status(200).json(review)
  }catch(err){
      next(err);
  }
}

export const updateReview= async(req, res, next)=>{
  try{
      const updateReview = await Review.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body},
          { new: true }
          );
      res.status(200).json(updateReview);
  }catch(err){
      next(err);
  }
}

export const deleteReview = async(req, res, next)=>{
  try{
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json("Review da bi xoa");
  }catch(err){
      next(err);
  }
}

// export const getOrderServices = async(req, res, next) => {
//   try{
//       const order = await Order.findById(req.params.id)
//       const list  = await Promise.all(
//           order.services.map(service=>{
//               return Service.findById(service);
//           })
//       );
//       res.status(200).json(list)
//   }catch(err){
//       next(err)
//   }
// }
