import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

// Router Imports
import projectRouter from "./routes/projectRouter.js";

// Middleware Imports
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

// Only run morgan middleware in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware

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

app.use("/api/v1/projects", projectRouter);

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
