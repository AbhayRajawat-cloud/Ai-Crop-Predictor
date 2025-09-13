import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";
import "../config/passport.js"; // Ensure passport strategies are loaded

const router = express.Router();

// Test route — add this right after the router declaration
router.get("/test", (req, res) => {
  res.json({ message: "✅ Auth route working!" });
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: info ? info.message : "Login failed" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  })(req, res, next);
});

// Protected route example
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
