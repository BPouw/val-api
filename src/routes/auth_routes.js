const express = require("express");
const router = express.Router();
const { checkDuplicateUsername } = require("../middleware");
const controller = require("../controllers/auth.controller");

router.post("/signup" , controller.signup)

router.post("/signin", controller.signin)

router.post("/signout", controller.signout)

module.exports = router;
