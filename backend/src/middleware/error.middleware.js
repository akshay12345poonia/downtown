const AppError = require('../utils/AppError');

// 404 handler for unknown routes
exports.notFound = (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
};

// Global error handler
exports.globalErrorHandler = (err, req, res, next) => {
  console.error('Error 💥', err);

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  res.status(statusCode).json({
    status,
    message: err.message || 'Something went wrong'
  });
};

