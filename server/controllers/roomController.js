const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.createRoom = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const io = req.app.locals.io;
  const user = await User.findById(userId);

  // Check if user already has a socket id
  if (user?.roomId) {
    const sockets = await io.fetchSockets();
    // User already has a room, so join them to that room
  } else {
    console.log("new connection");
    // User doesn't have a room, so create a new one for them
    io.on("connection", (socket) => {
      socket.on("disconnect", function () {
        console.log("disconnect: ", socket.id);
      });
      // Save this socket connection to user model
      // Handle Create-room event
      socket.on("create-room", async () => {
        socket.join(socket.id, () => {
          console.log("The user has joined the recently created room.");
        });
        // Update user room ID in user model
        await User.findOneAndUpdate({ _id: userId }, { roomId: socket.id });
        socket.emit("room-created", socket.id);
      });
    });
  }

  res.status(200).json({
    status: "success",
  });
});
