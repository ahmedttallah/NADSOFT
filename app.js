// Packages
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// ENV Variables
require("dotenv").config();

// Custom Middleware
const { customLoggerMiddleware } = require("./middleware/customRequestLogger");
const { customErrorHandling } = require("./middleware/customErrorHandling");

// Swagger Documentation
const swaggerDocs = require("./DOCS/Swagger");

// Create Server
const app = express();

// Initialize Swagger
// Define your basic auth options
const authOptions = {
  users: {
    admin: "admin@123",
  },
  challenge: true,
  realm: "NADSOFT",
};
app.use(
  "/api-docs",
  basicAuth(authOptions),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

// Middlewares
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use the custom logger middleware to log all incoming requests
app.use(customLoggerMiddleware);

// Backend Routes
app.use("/api/v1", require("./routes"));

// Error handling middleware
app.use(customErrorHandling);

// Listening
const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`[OK] Listening on http://localhost:${PORT} `));

module.exports = app; // Export the app instance for testing
