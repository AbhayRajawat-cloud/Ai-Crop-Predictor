const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// ===== TRUST PROXY (Important for rate limiting behind proxies) =====
app.set('trust proxy', 1);

// ===== Security =====
app.use(helmet());

// ===== Rate Limiting =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// ===== CORS =====
const allowedOrigins = [
  
  'http://localhost:3000',
  'https://super-duper-parakeet-97wvvrjjrx5vf6wg-8080.app.github.dev', // Removed trailing slash
  'https://super-duper-parakeet-97wvvrjjrx5vf6wg-3000.app.github.dev', // Added React dev server
];

app.use(cors({
  origin: function(origin, callback){
    console.log('Origin:', origin); // Debug log
    if (!origin) return callback(null, true); // allow curl, mobile apps
    if (allowedOrigins.indexOf(origin) === -1) {
      console.log('CORS blocked origin:', origin); // Debug log
      return callback(new Error('CORS policy does not allow this origin'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// ===== Body parser =====
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== MongoDB =====
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-crop-predictor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ===== Health Check =====
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// ===== Global Error Handler =====
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(err.status || 500).json({ 
    status: 'error', 
    message: err.message || 'Internal Server Error' 
  });
});

// ===== 404 Handler =====
app.use('*', (req, res) => {
  console.log('404 - Route not found:', req.originalUrl);
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Allowed origins:', allowedOrigins);
});