import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// export const register = async (req, res, next)=>{
//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const hash = bcrypt.hashSync(req.body.password, salt);

//        const newUser = new User({
//         ...req.body,
//         password: hash,
//        })

//        await newUser.save()
//        res.status(200).send("Người dùng đã được tạo.");
//     }catch(err){
//         next(err);
//     }
// };


export const register = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
  
      // Kiểm tra xem người dùng đã kiểm tra checkbox "staff" hay không
      // const isAdmin = req.body.role === "staff";
  
      const userData = {
        ...req.body,
        password: hash,
         // Đặt trường "isAdmin" thành true nếu người dùng kiểm tra checkbox "staff"
      };
  
      const newUser = new User(userData);
      await newUser.save();
      res.status(200).send("Người dùng đã được tạo.");
    } catch (err) {
      next(err);
    }
  };
  

export const login = async (req, res, next) => {
  try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
          return next(createError(404, "Không tìm thấy người dùng!"));
      }

      // if (!!user.lockReason) {
      //     return next(createError(403,"Lý do khóa:" + user.lockReason));
      // }
      if (!!user.locked) {
        return next(createError(403,"Tài khoản bị khóa.\n Lý do khóa: " + user.lockReason));
    }

      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordCorrect) {
          return next(createError(400, "Tài khoản hoặc mật khẩu sai!"));
      }

      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

      const { password, isAdmin, ...otherDetails } = user._doc;
      res.cookie("access_token", token, {
          httpOnly: true,
      })
      .status(200).json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
      next(err);
  }
};

// export const login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) {
//         return next(createError(404, "Không tìm thấy người dùng!"));
//     }

//     if (user.isLocked) {
//       // Trả về thông tin về lý do bị khóa
//       return res.status(403).json({ error: "Tài khoản của bạn đã bị khóa.", lockReason: user.lockReason });
//     }

//     const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
//     if (!isPasswordCorrect) {
//       return next(createError(400, "Tài khoản hoặc mật khẩu sai!"));
//     }

//     const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);

//     const { password, isAdmin, ...otherDetails } = user._doc;
//     res.cookie("access_token", token, {
//       httpOnly: true,
//     })
//     .status(200).json({ details: { ...otherDetails }, isAdmin });
//   } catch (err) {
//     next(err);
//   }
// };

export const logout = async (req, res)=>{
    res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
