import { Router } from "express";

import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import { validateProjectInput } from "../middleware/validationMiddleware.js";

const router = Router();
router.route("/").get(getAllProjects).post(validateProjectInput, createProject);

router
  .route("/:id")
  .get(getProject)
  .patch(validateProjectInput, updateProject)
  .delete(deleteProject);

export default router;
