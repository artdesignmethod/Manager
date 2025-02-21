import Project from "../models/ProjectModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

export const getAllProjects = async (req, res) => {
  const { search, projectStatus, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  // search = req.query.search
  // i = not case sensitive
  if (search) {
    queryObject.$or = [{ projectName: { $regex: search, $options: "i" } }];
  }

  if (projectStatus && projectStatus !== "all") {
    queryObject.projectStatus = projectStatus;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "projectName",
    "z-a": "-projectName",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Pagination Setup
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const projects = await Project.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalProjects = await Project.countDocuments(queryObject);

  const numberOfPages = Math.ceil(totalProjects / limit);

  res.status(StatusCodes.OK).json({
    projects,
    projectStatus,
    totalProjects,
    numberOfPages,
    currentPage: page,
  });
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

  res
    .status(StatusCodes.OK)
    .json({ msg: "Project deleted.", project: removedProject });
};

export const showStats = async (req, res) => {
  let stats = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$projectStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    scheduled: stats.scheduled || 0,
    production: stats.production || 0,
    completed: stats.completed || 0,
  };

  let monthlyProjects = await Project.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyProjects = monthlyProjects
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyProjects });
};
