import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON(); // toJSON = schema custom method

  res.status(StatusCodes.OK).json({ msg: userWithoutPassword });
};

export const getAppStats = async (req, res) => {
  const allUsers = await User.find({});
  const users = await User.countDocuments();
  const projects = await Project.countDocuments();

  res.status(StatusCodes.OK).json({ users, projects, allUsers });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  console.log(newUser);
  const currentUserData = await User.findByIdAndUpdate(
    req.user.userId,
    newUser
  );

  res.status(StatusCodes.OK).json({ msg: "Updated user profile." });
};
