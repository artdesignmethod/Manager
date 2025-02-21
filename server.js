import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

// Router Imports
import projectRouter from "./routes/projectRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// Public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// Middleware Imports
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

// Only run morgan middleware in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

// Allow images from specific URL
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'", "'unsafe-inline'", "https://picsum.photos/200"],
      "img-src": ["'self'", "https: data:"],
    },
  })
);

app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("Hello.");
});

app.use("/api/v1/projects", authenticateUser, projectRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// Not found middleware applies to all requests and URLS.
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Not found." });
});

app.use(errorHandlerMiddleware);

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
