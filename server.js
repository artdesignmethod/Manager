import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";

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
