import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  getAppStats,
  updateUser,
} from "../controllers/userController.js";

import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";

import {
  authorizePermissions,
  checkForGuestUser,
} from "../middleware/authMiddleware.js";

import upload from "../middleware/multerMiddleware.js";

router.get("/current-user", getCurrentUser);

router.get("/admin/app-stats", [authorizePermissions("admin"), getAppStats]);

router.patch(
  "/update-user",
  checkForGuestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);

export default router;
