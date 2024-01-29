// Project dependencies
const { prisma } = require("../config/prismaConfig");

// Function to validate mobile number format
function isValidMobileFormat(mobile) {
  // Validate mobile number format: + followed by country code and at least 9 numbers
  const mobileRegex = /^\+(\d{1,4})\d{9,}$/;
  return mobileRegex.test(mobile);
}

// Function to validate email format
function isValidEmailFormat(email) {
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

module.exports = {
  createUser: async (req, res) => {
    try {
      const { email, name, age, country, mobile } = req.body;

      // Validate data
      if (!email || !name || !age || !country || !mobile) {
        return res.status(400).json({
          success: false,
          message: "Please provide all fields",
        });
      }

      // Validate email format
      if (!isValidEmailFormat(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format. Please enter a valid email address.",
        });
      }

      // Validate country format
      if (!/^[a-zA-Z]+$/.test(country)) {
        return res.status(400).json({
          success: false,
          message: "Invalid country format. Only letters allowed.",
        });
      }

      // Validate mobile number format
      if (!isValidMobileFormat(mobile)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid mobile number format. Please enter a valid mobile number.",
        });
      }

      // Check if user already exists
      const checkUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (checkUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists",
        });
      }

      // Create the user
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          age: age,
          country: country,
          mobile: mobile,
        },
      });

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (err) {
      console.log("createUser ~ err:", err.message ? err.message : err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message ? err.message : err,
      });
    }
  }, // Add user

  getAllUsers: async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json({
        success: true,
        message: "Users retrieved",
        data: users,
      });
    } catch (err) {
      console.log("getAllUsers ~ err:", err.message ? err.message : err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message ? err.message : err,
      });
    }
  }, // Get All Users

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User retrieved",
        data: user,
      });
    } catch (err) {
      console.log("getUserById ~ err:", err.message ? err.message : err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message ? err.message : err,
      });
    }
  }, // Get User By Id

  updateUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const { email, name, age, country, mobile } = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          email: email,
          name: name,
          age: age,
          country: country,
          mobile: mobile,
        },
      });

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (err) {
      console.log("updateUserById ~ err:", err.message ? err.message : err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message ? err.message : err,
      });
    }
  }, // Update user

  deleteUserById: async (req, res) => {
    try {
      const userId = req.params.id;

      // Check if the user with the given ID exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Delete the user
      const deletedUser = await prisma.user.delete({
        where: { id: userId },
      });

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (err) {
      console.log("deleteUserById ~ err:", err.message ? err.message : err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message ? err.message : err,
      });
    }
  }, // Delete user
};
