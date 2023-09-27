import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import Service from "../models/Service.js"
import { createError } from "../utils/error.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const createOrder = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelid);
    // const newOrder = new Order(req.body);
    const newOrder = new Order({
      hotelId: hotel._id,
      nameHotel: hotel.name,
      title: hotel.title,
      city: hotel.city,
      address: hotel.address,
      price: req.body.priceRoom,
      priceBasic: req.body.priceBasic,
      rooms: req.body.rooms,
      roomId: req.body.roomId,
      userId: req.body.userId,
      userName: req.body.userName,
      photoRoom: req.body.photoRoom,
      titleRoom: req.body.titleRoom,
      quantity: req.body.quantity,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,

    });
    // console.log({...req.body})
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
          { status: 'Đã hủy' },
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

export const getOrderServices = async(req, res, next) => {
  try{
      const order = await Order.findById(req.params.id)
      const list  = await Promise.all(
          order.services.map(service=>{
              return Service.findById(service);
          })
      );
      res.status(200).json(list)
  }catch(err){
      next(err)
  }
}
