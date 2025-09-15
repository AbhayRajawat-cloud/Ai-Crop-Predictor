const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.header('x-auth-token');

    // Check if no token
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'No token provided, access denied'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Get user from database
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Token is not valid, user not found'
        });
      }

      // Check if account is locked
      if (user.isLocked()) {
        return res.status(423).json({
          status: 'error',
          message: 'Account is temporarily locked'
        });
      }

      // Add user to request object
      req.user = decoded;
      req.userData = user;
      next();
    } catch (error) {
      res.status(401).json({
        status: 'error',
        message: 'Token is not valid'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error in authentication'
    });
  }
};

// Admin authorization middleware
const admin = (req, res, next) => {
  if (req.userData && req.userData.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin rights required.'
    });
  }
};

// Farmer authorization middleware (for farmers and admins)
const farmerOrAdmin = (req, res, next) => {
  if (req.userData && (req.userData.role === 'farmer' || req.userData.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Access denied. Farmer or admin rights required.'
    });
  }
};

// Optional auth middleware (doesn't require token but adds user if present)
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                 req.header('x-auth-token');

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (user && !user.isLocked()) {
          req.user = decoded;
          req.userData = user;
        }
      } catch (error) {
        // Invalid token, but that's OK for optional auth
        console.log('Optional auth - invalid token:', error.message);
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};

// Verification required middleware
const requireVerified = (req, res, next) => {
  if (req.userData && req.userData.isVerified) {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Email verification required to access this resource'
    });
  }
};

module.exports = {
  auth,
  admin,
  farmerOrAdmin,
  optionalAuth,
  requireVerified
};