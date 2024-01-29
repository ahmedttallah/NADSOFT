// ENV Variables
require("dotenv").config();

// Apis
const userRoutesDocs = require("./user.docs");

const swaggerDoc = {
  openapi: "3.1.0",
  info: {
    title: "API",
    version: "1.0.0",
  },
  servers: [
    {
      url: `/api/v1`,
    },
  ],
  components: {
    securitySchemes: {
      basicAuth: {
        type: "http",
        scheme: "basic",
      },
    },
  },
  paths: {
    ...userRoutesDocs,
  },
};

// Set dynamic host parameter in Swagger doc
swaggerDoc.host = "${req.headers.host}";

module.exports = swaggerDoc;
