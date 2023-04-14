const User = require("../models/userModel");
const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createRoom = catchAsync(async (req, res, next) => {
  const { userId, roomId } = req.body;
  let user = await User.findById(userId);
  if (user?.activeRooms?.length < 10) {
    // Create a new room
    const room = await Room.create({
      roomId,
      owner: userId,
      participants: [user._id],
    });

    // Update User
    user = await User.findByIdAndUpdate(userId, {
      $push: { activeRooms: roomId },
    });
  } else {
    return res.status(403).json({
      status: "failure",
      result:
        "Cannot create more than 1 room for a user. Leave other rooms before creating a new one.",
    });
  }

  res.status(200).json({
    status: "success",
    result: user?.activeRooms ?? false,
  });
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const { userId, roomId } = req.body;
  const room = await Room.findOne({ roomId: roomId });

  if (!room)
    return next(
      new AppError("The invite code may have expired. Please try again.", 400)
    );

  if (room.participants.length < room.settings.participantsLimit) {
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { $push: { participants: userId } }
    );

    // await User.findByIdAndUpdate(userId, { $push: { activeRooms: roomId } });

    return res.status(200).json({
      status: "success",
      room,
    });
  } else {
    return next(new AppError("Room is full. Please try later!", 403));
  }
});

exports.updateRoom = catchAsync(async (req, res, next) => {
  const { roomId, settings } = req.body;

  const room = await Room.findOneAndUpdate(
    { roomId: roomId },
    { settings: settings }
  );

  if (!room)
    return next(new AppError("Something went wrong. Please try again", 500));

  return res.status(200).json({
    status: "success",
    room,
  });
});
