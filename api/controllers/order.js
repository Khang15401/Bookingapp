import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import User from "../models/User.js";
import Stripe from 'stripe';
import mongoose from "mongoose";

// export const intent = async (req, res, next) => {

//   const stripe = new Stripe(process.env.STRIPE);

//   const hotel = await Hotel.findById(req.params.hotelid);
//   const order = await Order.findById(req.params.id);

//   const paymentIntent = stripe.paymentIntents.create({
//     amount: order.price,
//     currency: "vnd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//     });

//     const newOrder = new Order({
//       nameHotel: hotel.name,
//       title: hotel.title,
//       city: hotel.city,
//       price: req.body.priceRoom,   
//       rooms: req.body.rooms,
//       roomId: req.body.roomId,
//       userId: req.body.userId,
//       userName: req.body.userName,
//       payment_intent: paymentIntent.id
//     });
//     await newOrder.save();
//     res.status(200).send({
//       clientSecret: (await paymentIntent).client_secret,
//     });
// };

export const createOrder = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid);
    // const newOrder = new Order(req.body);
    const newOrder = new Order({
      nameHotel: hotel.name,
      title: hotel.title,
      city: hotel.city,
      price: req.body.priceRoom,   
      rooms: req.body.rooms,
      roomId: req.body.roomId,
      userId: req.body.userId,
      userName: req.body.userName,
    });
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (err) {
    console.log(err);
  }
};
// GET ORDER User ID
export const getOrder = async(req, res, next)=>{
  try{
      const order = await Order.find({userId: req.params.id});
      res.status(200).json(order)
  }catch(err){
      next(err);
  }
}
// GET ORDER BY ID
export const getOrderId = async(req, res, next)=>{
  try{
      const order = await Order.findById(req.params.id);
      res.status(200).json(order)
  }catch(err){
      next(err);
  }
}
export const getOrders = async(req, res, next)=>{
  try{
      const order = await Order.find();
      res.status(200).json(order)
  }catch(err){
      next(err);
  }
}

export const updateOrder = async(req, res, next)=>{
  try{
      const updateOrder = await Order.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body},
          { new: true }
          );
      res.status(200).json(updateOrder);
  }catch(err){
      next(err);
  }
}
export const cancleOrder = async(req, res, next)=>{
  try{
      const cancleOrder = await Order.findByIdAndUpdate(
          req.params.id, 
          { status: 'Đã Hủy' },
          { new: true }
          );
      res.status(200).json(cancleOrder);
  }catch(err){
      next(err);
  }
}

export const deleteOrder = async(req, res, next)=>{
  try{
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order da bi xoa");
  }catch(err){
      next(err);
  }
}
