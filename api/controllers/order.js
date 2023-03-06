import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import User from "../models/User.js";
// import mongoose from "mongoose";

export const createOrder = async (req, res, next) => {
  try {
  console.log(req);
    const hotel = await Hotel.findById(req.params.hotelid);
    // const newOrder = new Order(req.body);
    const newOrder = new Order({
      nameHotel: hotel.name,
      title: hotel.title,
      city: hotel.city,
      rooms: req.body.rooms,
      price: hotel.cheapestPrice,
      userId: req.body.userId,
      roomNumber1: req.body.roomNumber1
      
    });
    // console.log(newOrder);
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    console.log(err);
  }
};

export const getOrder = async(req, res, next)=>{
  try{
      const order = await Order.find({userId: req.params.id});
      res.status(200).json(order)
  }catch(err){
      next(err);
  }
}
