// Packages
const router = require("express").Router();

// Controllers
const { basicAuth } = require("../middleware/basicAuth");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

// @Desc      : Add User
// @Method    : [POST]
// @Route     : /api/v1/user/
router.post("/", createUser);

// @Desc      : Get All Users
// @Method    : [GET]
// @Route     : /api/v1/user/
router.get("/", getAllUsers);

// @Desc      : Get User by ID
// @Method    : [GET]
// @Route     : /api/v1/user/:id
router.get("/:id", getUserById);

// @Desc      : Update User by ID
// @Method    : [PATCH]
// @Route     : /api/v1/user/:id
router.patch("/:id", updateUserById);

// @Desc      : Delete User by ID
// @Method    : [DELETE]
// @Route     : /api/v1/user/:id
router.delete("/:id", basicAuth, deleteUserById);

module.exports = router;
