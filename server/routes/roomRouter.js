const express = require("express");
const roomController = require("../controllers/roomController");
const authController = require("../controllers/authController");

const router = express.Router();
router.use(authController.protect);

router
  .route("/")
  .post(roomController.createRoom)
  .patch(roomController.updateRoom);

router.get("/:roomId", roomController.getRoomData);
router.post("/join", roomController.joinRoom);
router.patch("/leave", roomController.leaveRoom);
router.post("/start", roomController.startRoom);
router.post("/remove", roomController.removeParticipant);

module.exports = router;
