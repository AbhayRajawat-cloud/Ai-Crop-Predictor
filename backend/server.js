import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import configurePassport from "./config/passport.js";
import predictRoute from "./routes/predictRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: "https://fuzzy-goldfish-pjqr7q99x4pvf7447-8080.app.github.dev", // ← FRONTEND URL (port 8080)
  credentials: true
}));

app.use(passport.initialize());
configurePassport(passport);

//DB Connection
//mongoose.connect(process.env.MONGO_URI)
  //.then(() => console.log("✅ MongoDB connected"))
  //.catch(err => console.error(err));

// Routes
app.use("/auth", authRoutes);
app.use("/predict", predictRoute);

// Default route
app.get("/", (req, res) => {
  res.send("🌱 Ai-Crop-Predictor Backend is Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

