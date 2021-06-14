import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import menteeRouter from "./router/menteeRouter.js";
import mentorRouter from "./router/mentorRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const connection_url = "mongodb://localhost:27017/design_lab";

mongoose.connect(
  connection_url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Databse Connected");
  }
);

app.use("/api/users/mentee", menteeRouter);
app.use("/api/users/mentor", mentorRouter);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
