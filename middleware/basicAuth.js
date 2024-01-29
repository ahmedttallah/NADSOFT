// Packages
const expressBasicAuth = require("express-basic-auth");

// Define your basic auth options
const authOptions = {
  users: {
    admin: "admin@123",
  },
  challenge: true,
  realm: "NADSOFT",
};

module.exports = {
  basicAuth: expressBasicAuth(authOptions),
};
