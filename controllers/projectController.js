import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK).json({ projects });
};

// Create Project
export const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const project = await Project.create(req.body);

  res.status(StatusCodes.CREATED).json({ project });
};

// Get Single Project
export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  res.status(StatusCodes.OK).json({ project });
};

// Update Project
export const updateProject = async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true, // Inside this options object, new: true = Get Updated Project. By default you get the old Project, not Updated one.
    }
  );

  res.status(StatusCodes.OK).json({ project: updatedProject });
};

// Delete Project
export const deleteProject = async (req, res) => {
  const removedProject = await Project.findByIdAndDelete(req.params.id);

  res.status(200).json({ msg: "Project deleted.", project: removedProject });
};
