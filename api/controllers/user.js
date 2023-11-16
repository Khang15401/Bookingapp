import User from "../models/User.js";
import bcrypt from "bcryptjs"


export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Người dùng đã bị xóa");
  } catch (err) {
    next(err);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUsersByRole = async (req, res, next) => {
  try {
    const users = await User.find({ role: "staff" });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserByQuery = async (req, res, next) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    next(err);
  }
};

export const lockUser = async (req, res, next) => {
  try {
    const { lockReason } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        locked: "true",
        lockReason,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const unlockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        locked: "",
        lockReason: null,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Lấy thông tin người dùng từ userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json("Người dùng không tồn tại");
    }

    // So sánh mật khẩu cũ
    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json("Mật khẩu cũ không chính xác");
    }

    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      return res.status(400).json("Xác nhận mật khẩu mới không khớp");
    }

    // Mã hóa mật khẩu mới
    const newHashedPassword = bcrypt.hashSync(newPassword, 10);

    // Cập nhật mật khẩu mới cho người dùng
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json("Mật khẩu đã được thay đổi thành công");
  } catch (err) {
    next(err);
  }
};
