module.exports = {
  customLoggerMiddleware: (req, res, next) => {
    // Log request information to the console
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );

    // Proceed to the next middleware or route handler
    next();
  },
};
