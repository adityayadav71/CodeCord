const mongoose = require("mongoose");
const User = require("../models/userModel");
const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const userId = req.user.id;

  let user = await User.findById(userId);
  const currentTimeStamp = Date.now();

  //1) User created room but not updated/Joined that room (only opened the modal & closed it)
  if (!user.activeRoom?.expiresAt) {
    await User.findByIdAndUpdate(userId, { activeRoom: undefined });
  }

  //2) Room is created but it is expired
  if (user.activeRoom?.expiresAt < currentTimeStamp) {
    await Room.findOneAndDelete({ roomId: user.activeRoom.roomId });
    await User.findByIdAndUpdate(userId, { activeRoom: undefined });
  }

  // No Active Room created
  if (
    !user.activeRoom?.expiresAt ||
    user.activeRoom?.expiresAt < currentTimeStamp ||
    !user.activeRoom
  ) {
    // Update User
    user = await User.findByIdAndUpdate(userId, {
      activeRoom: { roomId },
    });
  }
  // If the Room is active & working, then throw an error.
  if (user.activeRoom?.expiresAt > currentTimeStamp) {
    return res.status(403).json({
      status: "failure",
      result:
        "Cannot create more than 1 room for a user. Leave other rooms before creating a new one.",
    });
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const userId = req.user._id;

  const room = await Room.findOne({ roomId });

  if (req.user._id.equals(room.owner))
    return next(
      new AppError(
        "You are the host of this room. You can't join this room.",
        403
      )
    );

  if (userId.equals(room.owner))
    return next(
      new AppError(
        "You are the host of this room. You can't join this room.",
        403
      )
    );

  if (room.participants.length < room.settings.participantsLimit) {
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { $push: { participants: req.user._id } },
      { new: true }
    );
    // Get expiresAt from owner
    const owner = await User.findById(room.owner);
    const expiresAt = owner.activeRoom.expiresAt;

    await User.findByIdAndUpdate(userId, {
      activeRoom: { roomId, expiresAt },
    });

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
  const userId = req.user._id;

  // Create a new room
  const room = await Room.create({
    roomId,
    owner: userId,
    settings: settings,
    participants: [userId],
  });

  await User.findByIdAndUpdate(userId, {
    activeRoom: { roomId },
  });

  if (!room)
    return next(new AppError("Something went wrong. Please try again", 500));

  // 3. Send room details on success
  return res.status(200).json({
    status: "success",
    room,
  });
});

exports.leaveRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const userId = req.user._id;
  let newRoom;
  const room = await Room.findOne({ roomId: roomId });
  let hostChanged = false;

  //Remove from user model (delete activeRoom field from userModel)
  await User.findByIdAndUpdate(userId, {
    $unset: { activeRoom: "" },
  });

  if (room?.owner.equals(userId)) {
    // User is a host of that room so change the host of perticular room
    if (room?.participants?.length === 1) {
      // Delete the room
      await Room.findOneAndDelete({ roomId });
    } else {
      hostChanged = true;
      const newOwner = room.participants.filter((id) => !id.equals(userId))[0];
      newRoom = await Room.findOneAndUpdate(
        { roomId },
        { owner: newOwner, $pull: { participants: userId } },
        { new: true }
      );
    }
  } else {
    newRoom = await Room.findOneAndUpdate(
      { roomId },
      { $pull: { participants: userId } },
      { new: true }
    );
  }

  res.status(200).json({
    status: "success",
    hostChanged,
    newOwner: newRoom?.owner,
    newRoom,
  });
});

exports.getRoomData = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;
  const room = await Room.findOne({ roomId: roomId });

  res.status(200).json({
    status: "success",
    room,
  });
});

exports.startRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const userId = req.user._id;
  const room = await Room.findOne({ roomId });

  if (!room) {
    return next(new AppError("No such room exist with that Id", 404));
  }

  if (!room.owner.equals(userId)) {
    return next(new AppError("Only Host can start the room", 404));
  }
  const expiresAt = Date.now() + room?.settings?.timeLimit * 60 * 1000;
  const updatedRoom = await Room.findOneAndUpdate(
    { roomId },
    { hasStarted: true, expiresAt },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    room: updatedRoom,
  });
});

exports.removeParticipant = catchAsync(async (req, res, next) => {
  const { userId, roomId } = req.body;

  const room = await Room.findOne({ roomId });

  if (!room) {
    return next(new AppError("No such room exists with that Id", 404));
  }

  if (!room.owner.equals(req.user._id)) {
    return next(new AppError("You are not authorized", 403));
  }

  //Remove from user model (delete activeRoom field from userModel)
  await User.findByIdAndUpdate(userId, {
    $unset: { activeRoom: "" },
  });

  const updatedRoom = await Room.findOneAndUpdate(
    { roomId },
    { $pull: { participants: userId } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    room: updatedRoom,
  });
});
