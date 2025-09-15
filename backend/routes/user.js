const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { auth, admin } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = '7d';

// ======================= AUTH ROUTES =======================

// @route   POST /api/user/register
// @desc    Register new user
// @access  Public
router.post(
  '/register',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
      }

      const { firstName, lastName, email, password } = req.body;

      // Check if email exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ status: 'error', message: 'Email already registered' });
      }

      const user = new User({ firstName, lastName, email, password });
      await user.save();

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: { user: user.toJSON() },
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
    }
  }
);

// @route   POST /api/user/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
      }

      if (user.isLocked()) {
        return res.status(403).json({ status: 'error', message: 'Account locked. Try again later.' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        await user.incLoginAttempts();
        return res.status(400).json({ status: 'error', message: 'Invalid email or password' });
      }

      // reset login attempts on success
      user.loginAttempts = 0;
      user.lockUntil = undefined;
      user.lastLogin = new Date();
      await user.save();

      const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      res.json({
        status: 'success',
        message: 'Login successful',
        token,
        data: { user: user.toJSON() },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ status: 'error', message: 'Server error', error: error.message });
    }
  }
);

// ======================= PROFILE ROUTES =======================

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ status: 'success', data: { user: user.toJSON() } });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get profile', error: error.message });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  [
    auth,
    body('firstName').optional().trim().isLength({ min: 2, max: 50 }),
    body('lastName').optional().trim().isLength({ min: 2, max: 50 }),
    body('email').optional().isEmail().normalizeEmail(),
    body('profile.phone').optional().matches(/^\+?[\d\s-()]{10,}$/),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
      }

      const userId = req.user.userId;
      const updates = req.body;

      delete updates.password;
      delete updates.role;
      delete updates.isVerified;

      const user = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true, runValidators: true });

      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      res.json({ status: 'success', message: 'Profile updated successfully', data: { user: user.toJSON() } });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to update profile', error: error.message });
    }
  }
);

// @route   PUT /api/user/change-password
// @desc    Change user password
// @access  Private
router.put(
  '/change-password',
  [
    auth,
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('New passwords do not match');
      }
      return true;
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }

      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ status: 'error', message: 'Current password is incorrect' });
      }

      user.password = newPassword;
      await user.save();

      res.json({ status: 'success', message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ status: 'error', message: 'Failed to change password', error: error.message });
    }
  }
);

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({ status: 'success', message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete account', error: error.message });
  }
});

// @route   GET /api/user/all
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/all', [auth, admin], async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password -verificationToken -resetPasswordToken')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.json({
      status: 'success',
      data: { users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to get users', error: error.message });
  }
});

module.exports = router;
