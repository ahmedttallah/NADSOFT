// Packages
const router = require("express").Router();

// @Desc      : User Routes
// @Methods   : [POST, GET, PATCH, DELETE]
// @Route     : /api/v1/user/
router.use("/user", require("./userRoutes"));

module.exports = router;
