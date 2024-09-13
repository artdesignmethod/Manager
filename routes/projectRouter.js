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

import { checkForGuestUser } from "../middleware/authMiddleware.js";

const router = Router();

router
  .route("/")
  .get(getAllProjects)
  .post(checkForGuestUser, validateProjectInput, createProject);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getProject)
  .patch(
    checkForGuestUser,
    validateProjectInput,
    validateIdParam,
    updateProject
  )
  .delete(checkForGuestUser, validateIdParam, deleteProject);

export default router;
