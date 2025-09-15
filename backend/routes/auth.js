const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../Middleware/auth");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
};

// ---------------- REGISTER ----------------
router.post(
  "/register",
  [
    body("firstName").trim().isLength({ min: 2 }).withMessage("First name required"),
    body("lastName").trim().isLength({ min: 2 }).withMessage("Last name required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, email, password } = req.body;

      // check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({ firstName, lastName, email, password: hashedPassword });
      await user.save();

      const token = generateToken(user._id);

      res.json({ token, user });
    } catch (err) {
      console.error("Register error:", err.message);
      res.status(500).send("Server error");
    }
  }
);

// ---------------- LOGIN ----------------
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = generateToken(user._id);

      res.json({ token, user });
    } catch (err) {
      console.error("Login error:", err.message);
      res.status(500).send("Server error");
    }
  }
);

// ---------------- DASHBOARD (Protected) ----------------
router.get("/dashboard", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json({ msg: "Welcome to dashboard", user });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ---------------- ME (Protected) ----------------
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ---------------- LOGOUT ----------------
router.post("/logout", auth, (req, res) => {
  res.json({ msg: "Logged out successfully (client must delete token)" });
});

module.exports = router;
