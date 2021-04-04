const express = require("express");
const router = express.Router();
const authMiddle = require("../middlewares/Auth.middleware");
const roleMiddle = require("../middlewares/Role.middleware");

router.get("/setting", authMiddle.isAuthorize, roleMiddle.isAdmin);

module.exports = router;
