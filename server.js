import express from "express";

const app = express();

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

app.listen(3000, () => {
  console.log("Server running.");
});
