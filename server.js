import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});