/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admins.js";
import employeeRoutes from "./routes/employee.js";

const app = express();

/** Middlewares */
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 8800;

const connect = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process?.env?.MONGO_URL || "mongodb://localhost:27017/crm-project")
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

console.log("works");
app.get("/api", (req, res) => {
  console.log("request recieved");
  res.json({});
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(port, () => {
  console.log("Connected");
  connect();
});
