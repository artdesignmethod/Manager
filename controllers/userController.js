import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Project from "../models/ProjectModel.js";
import { formatImage } from "../middleware/multerMiddleware.js";
import cloudinary from "cloudinary";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON(); // toJSON = schema custom method

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
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

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const currentUserData = await User.findByIdAndUpdate(
    req.user.userId,
    newUser
  );

  if (req.file && currentUserData.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(currentUserData.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "User profile updated." });
};
