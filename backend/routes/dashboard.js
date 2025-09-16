// const express = require('express');
// const { auth, farmerOrAdmin } = require('../Middleware/auth');
// const User = require('../models/User');

// const router = express.Router();

// // @route   GET /api/dashboard/stats
// // @desc    Get dashboard statistics for the user
// // @access  Private
// router.get('/stats', auth, async (req, res) => {
//   try {
//     const user = req.userData;
    
//     // Mock data for crop predictions and statistics
//     // In a real application, this would come from your AI model and database
//     const stats = {
//       user: {
//         id: user._id,
//         name: user.fullName,
//         role: user.role,
//         location: user.profile.location || {},
//         farmDetails: user.profile.farmDetails || {}
//       },
//       predictions: {
//         total: 15,
//         successful: 12,
//         pending: 2,
//         failed: 1,
//         accuracy: 85.5
//       },
//       crops: {
//         tracked: ['Wheat', 'Rice', 'Corn', 'Soybeans'],
//         currentSeason: {
//           planted: 150, // acres
//           harvested: 120,
//           inProgress: 30
//         },
//         recommendations: [
//           {
//             id: 1,
//             crop: 'Wheat',
//             action: 'Plant in next 2 weeks',
//             priority: 'high',
//             reason: 'Optimal soil conditions and weather forecast'
//           },
//           {
//             id: 2,
//             crop: 'Rice',
//             action: 'Harvest ready',
//             priority: 'urgent',
//             reason: 'Crops have reached maturity'
//           }
//         ]
//       },
//       weather: {
//         current: {
//           temperature: 24,
//           humidity: 68,
//           rainfall: 12.5,
//           windSpeed: 8.2
//         },
//         forecast: [
//           { date: '2024-01-20', temp: 26, humidity: 70, rainfall: 0 },
//           { date: '2024-01-21', temp: 28, humidity: 65, rainfall: 5.2 },
//           { date: '2024-01-22', temp: 25, humidity: 75, rainfall: 15.3 }
//         ]
//       },
//       analytics: {
//         monthlyPredictions: [
//           { month: 'Jan', predictions: 8, accuracy: 87.5 },
//           { month: 'Feb', predictions: 12, accuracy: 83.3 },
//           { month: 'Mar', predictions: 15, accuracy: 89.1 },
//           { month: 'Apr', predictions: 10, accuracy: 92.0 }
//         ],
//         cropYields: [
//           { crop: 'Wheat', predicted: 45, actual: 42, unit: 'tons' },
//           { crop: 'Rice', predicted: 38, actual: 40, unit: 'tons' },
//           { crop: 'Corn', predicted: 52, actual: 48, unit: 'tons' }
//         ]
//       }
//     };

//     res.json({
//       status: 'success',
//       data: stats
//     });

//   } catch (error) {
//     console.error('Dashboard stats error:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Failed to fetch dashboard statistics',
//       error: error.message
//     });
//   }
// });

// // @route   GET /api/dashboard/recent-activity
// // @desc    Get recent user activity
// // @access  Private
// // router.get('/')

const express = require("express");
const { auth } = require("../Middleware/auth");
const User = require("../models/User");

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics for the user
// @access  Private
router.get("/stats", auth, async (req, res) => {
  try {
    const user = req.userData;

    // Mock stats (replace with real logic later)
    const stats = {
      user: {
        id: user._id,
        name: user.fullName,
        role: user.role,
        location: user.profile?.location || {},
        farmDetails: user.profile?.farmDetails || {},
      },
      predictions: {
        total: 15,
        successful: 12,
        pending: 2,
        failed: 1,
        accuracy: 85.5,
      },
    };

    res.json({ status: "success", data: stats });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
});

module.exports = router;