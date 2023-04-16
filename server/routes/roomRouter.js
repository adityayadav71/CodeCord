const express = require("express");
const roomController = require("../controllers/roomController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(roomController.roomSettings)
  .post(roomController.createRoom)
  .patch(roomController.updateRoom);
router.post("/join", roomController.roomExists, roomController.joinRoom);

module.exports = router;
