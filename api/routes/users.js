import express from "express";
import {
  deleteUser,
  getUser,
  getUserByQuery,
  getUsers,
  getUsersByRole,
  lockUser,
  unlockUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication",verifyToken, (req,res,next)=>{
//     res.send("Chào bạn, bạn vừa đăng nhập ")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("Chào bạn, bạn vừa đăng nhập và bạn có thể xóa tài khoản của mình ")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("Chào admin")
// })

//UPDATE
router.patch("/:id", verifyUser, updateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/staff", verifyAdmin, getUsersByRole);

router.patch("/locked/:id", verifyAdmin, lockUser);
router.patch("/unlocked/:id", verifyAdmin, unlockUser);

router.get("/friend",verifyUser, getUserByQuery)
router.get("/:id", verifyUser, getUser);
//GET ALL

router.get("/", verifyAdmin, getUsers);

export default router;
