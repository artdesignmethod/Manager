import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";

export const getAllProjects = async (req, res) => {
  const projects = await Project.find({});
  res.status(StatusCodes.OK).json({ projects });
};

// Create Project
export const createProject = async (req, res) => {
  const project = await Project.create(req.body);

  res.status(StatusCodes.CREATED).json({ project });
};

// Get Single Project
export const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  res.status(StatusCodes.OK).json({ project });
};

// Update Project
export const updateProject = async (req, res) => {
  const { id } = req.params;

  const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
    new: true, // Inside this options object, new: true = Get Updated Project. By default you get the old Project, not Updated one.
  });

  res.status(StatusCodes.OK).json({ project: updatedProject });
};

// Delete Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const removedProject = await Project.findByIdAndDelete(id);

  res.status(200).json({ msg: "Project deleted.", project: removedProject });
};
