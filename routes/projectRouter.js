import { Router } from "express";

import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  showStats,
} from "../controllers/projectController.js";

import {
  validateProjectInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();
router.route("/").get(getAllProjects).post(validateProjectInput, createProject);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getProject)
  .patch(validateProjectInput, validateIdParam, updateProject)
  .delete(validateIdParam, deleteProject);

export default router;
