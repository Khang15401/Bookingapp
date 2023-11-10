import User from "../models/User.js";

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
