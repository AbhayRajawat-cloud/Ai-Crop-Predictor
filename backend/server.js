import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import configurePassport from "./config/passport.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
configurePassport(passport);

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use("/auth", authRoutes);

// Start server
app.listen(process.env.PORT, () => console.log(`🚀 Server running on port ${process.env.PORT}`));
