import { Router } from "express";
const router = Router();
import { register, login, logout } from "../controllers/authController.js";

import {
  validateRegisterInput,
  validateLoginInput,
} from "../middleware/validationMiddleware.js";

import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 100, // 15 minutes in milliseconds
  max: 20,
  message: {
    msg: "IP address rate limit exceeded, please retry in 15 minutes.",
  },
});

router.post("/register", apiLimiter, validateRegisterInput, register);

router.post("/login", apiLimiter, validateLoginInput, login);

router.get("/logout", logout);

export default router;
