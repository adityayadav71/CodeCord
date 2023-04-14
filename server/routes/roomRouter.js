const express = require("express");
const roomController = require("../controllers/roomController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", authController.protect, roomController.createRoom);
router.post("/join", authController.protect, roomController.joinRoom);
router.patch("/", authController.protect, roomController.updateRoom);

module.exports = router;

