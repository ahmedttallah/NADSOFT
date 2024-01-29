module.exports = {
  customErrorHandling: (err, req, res, next) => {
    // Log the error to the console
    console.error(err.stack);

    // Handle specific errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors,
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message ? err.message : err,
    });
  },
};
