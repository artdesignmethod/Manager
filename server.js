import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

import {
  createProject,
  deleteProject,
  updateProject,
  getAllProjects,
  getSingleProject,
} from "./controllers/projectController.js";

// Only run morgan middleware in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello.");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({
    message: "Testing post route. Received data successfully.",
    data: req.body,
  });
});

// Get All Projects
app.get("/api/v1/projects", getAllProjects);

// Create Project
app.post("/api/v1/projects", createProject);

// Get Single Project
app.get("/api/v1/projects/:id", getSingleProject);

// // Edit Project
app.patch("/api/v1/projects/:id", updateProject);

// // Delete Project
app.delete("/api/v1/projects/:id", deleteProject);

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on PORT ${port}.`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
