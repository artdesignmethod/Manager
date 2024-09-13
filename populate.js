import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Project from "./models/ProjectModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "guest@example.com" });
  const jsonProjects = JSON.parse(
    await readFile(new URL("./root-utils/mockData.json", import.meta.url))
  );
  const projects = jsonProjects.map((project) => {
    return { ...project, createdBy: user._id };
  });

  await Project.deleteMany({ createdBy: user._id });
  await Project.create(projects);

  console.log("Projects created successfully!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
