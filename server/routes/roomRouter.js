const express = require("express");
const roomController = require("../controllers/roomController");
const authController = require("../controllers/authController");

const router = express.Router();
router.get("/live", roomController.getLiveRooms);

router.use(authController.protect);

router
  .route("/")
  .post(roomController.createRoom)
  .patch(roomController.updateRoom);
  
router.get("/:roomId", roomController.getRoomData);
router.post("/join", roomController.joinRoom);
router.patch("/leave", roomController.leaveRoom);

// Host permissions required
router.post(
  "/start",
  roomController.checkHostPermissions,
  roomController.startRoom
);
router.post(
  "/end",
  roomController.checkHostPermissions,
  roomController.endRoom
);
router.post(
  "/remove",
  roomController.checkHostPermissions,
  roomController.removeParticipant
);

module.exports = router;
