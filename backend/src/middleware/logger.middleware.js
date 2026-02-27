// Simple request logger middleware (no extra dependencies)
module.exports = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const userId = req.user ? String(req.user._id) : null;

    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms` +
        (userId ? ` user=${userId}` : '')
    );
  });

  next();
};

