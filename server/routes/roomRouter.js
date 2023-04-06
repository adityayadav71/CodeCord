const express = require("express");
const authController = require("../controllers/authController");
const roomController = require("../controllers/roomController");

const router = express.Router();

router.post("/", authController.protect, roomController.createSocket);

module.exports = router;