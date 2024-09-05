import mongoose from "mongoose";
import { PROJECT_STATUS } from "../root-utils/constants.js";

const ProjectSchema = new mongoose.Schema(
  {
    projectName: String,
    projectDays: {
      type: Number,
      default: 1,
    },
    projectHours: {
      type: Number,
      default: 1,
    },
    projectPrice: {
      type: Number,
      default: 50,
    },
    projectStatus: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.SCHEDULED,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);

// Project = Collection name (Table) is named 'projects' in MongoDB automatically
