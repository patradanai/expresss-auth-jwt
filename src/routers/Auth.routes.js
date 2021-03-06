const express = require("express");
const router = express.Router();
const authMiddle = require("../middlewares/Auth.middleware");
const authController = require("../controllers/Auth.controller");

router.post("/signin", authController.signIn);

router.post("/signup", authMiddle.IsExistUser, authController.signUp);

router.get("/logout", authMiddle.isAuthorize, authController.Logout);

module.exports = router;
