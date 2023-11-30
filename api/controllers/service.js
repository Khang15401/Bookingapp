import Order from "../models/Order.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import Service from "../models/Service.js";

export const createService = async(req, res, next)=>{
  const newService = new Service(req.body)
  
  try{
      const savedService = await newService.save()
      res.status(200).json(savedService);
  }catch(err){
      next(err);
  }
}
// GET ORDER BY ID
export const getService = async(req, res, next)=>{
  try{
      const service = await Service.findById(req.params.id);
      res.status(200).json(service)
  }catch(err){
      next(err);
  }
}
// GET ALL SERVICE
export const getServices = async(req, res, next)=>{
  try{
      const hotelId = req.params.hotelid;

      const service = await Service.find({ hotelId: hotelId });
      res.status(200).json(service)
  }catch(err){
      next(err);
  }

  // try {
  //   const hotelId = req.params.hotelid;
  //   // const hotel = await Hotel.findById(req.params.hotelid);

  //   // Sử dụng Mongoose để tìm tất cả reviews có hotelId trùng khớp
  //   const reviews = await Review.find({ hotelId: hotelId });
  //   res.status(200).json(reviews);
  // } catch (err) {
  //   next(err);
  // }
}

export const getServices1 = async(req, res, next)=>{
    try{
        const service = await Service.find();
        res.status(200).json(service)
    }catch(err){
        next(err);
    }
  }

export const updateService = async(req, res, next)=>{
  try{
      const updateService = await Service.findByIdAndUpdate(
          req.params.id, 
          { $set: req.body},
          { new: true }
          );
      res.status(200).json(updateService);
  }catch(err){
      next(err);
  }
}

export const deleteService = async(req, res, next)=>{
  try{
      await Service.findByIdAndDelete(req.params.id);
      res.status(200).json("Dich vu da bi xoa");
  }catch(err){
      next(err);
  }
}

export const hiddenService = async (req, res, next) => {
    try {
      // Thay vì xóa, chúng ta sẽ cập nhật trạng thái isHidden thành true
      await Service.findByIdAndUpdate(req.params.id, { isHidden: true });
  
      res.status(200).json("Dịch vụ đã bị ẩn");
    } catch (err) {
      next(err);
    }
  };
