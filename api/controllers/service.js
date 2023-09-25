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
// GET ORDER User ID
// export const getService = async(req, res, next)=>{
//   try{
//       const service = await Service.find({userId: req.params.id});
//       res.status(200).json(service)
//   }catch(err){
//       next(err);
//   }
// }
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
