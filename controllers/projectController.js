import { nanoid } from "nanoid";

// For Testing routes
let projects = [
  { id: 4444, projectName: "Project 1", projectStatus: "completed" },
  { id: nanoid(), projectName: "Project 2", projectStatus: "scheduled" },
];

export const getAllProjects = async (req, res) => {
  res.status(200).json({ projects });
};

export const createProject = async (req, res) => {
  const { projectName, projectStatus } = req.body;

  if (!projectName || !projectStatus) {
    return res.status(400).json({ msg: "Project name and status required." });
  }
  const id = nanoid(10);

  const project = { id, projectName, projectStatus };
  projects.push(project);
  res.status(200).json({ project });
};

export const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).json({ msg: `No project found with id ${id}.` });
  }
  res.status(200).json({ project });
};

export const updateProject = async (req, res) => {
  const { projectName, projectStatus } = req.body;

  if (!projectName || !projectStatus) {
    return res.status(400).json({ msg: "Project name and status required." });
  }

  const { id } = req.params;
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(400).json({ msg: `No project found with id ${id}.` });
  }

  project.projectName = projectName;
  project.projectStatus = projectStatus;

  res.status(200).json({ msg: "Project updated.", project });
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = projects.find((project) => project.id === id);

  if (!project) {
    return res.status(404).json({ msg: `No project found with id ${id}.` });
  }

  const newProjects = projects.filter((project) => project.id !== id);
  projects = newProjects;

  res.status(200).json({ msg: "Project deleted." });
};
