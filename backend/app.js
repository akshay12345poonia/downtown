const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const AppError = require('./src/utils/AppError');
const authRoutes = require('./src/routes/auth.routes');
const propertyRoutes = require('./src/routes/property.routes');
const testimonialRoutes = require('./src/routes/testimonial.routes');
const agentRoutes = require('./src/routes/agent.routes');
const careerRoutes = require('./src/routes/career.routes');

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/agents', agentRoutes);
app.use('/api/v1/careers', careerRoutes);

// 404 handler for unknown routes (Express 5 safe catch-all)
app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error 💥', err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong'
  });
});

module.exports = app;

