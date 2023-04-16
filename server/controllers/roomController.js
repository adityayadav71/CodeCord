const User = require("../models/userModel");
const Room = require("../models/roomModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const isUserInAnyOtherRooms = catchAsync(async (userId) => {
  let user = await User.findById(userId);
  return user.activeRooms && user?.activeRooms?.length === 1;
});

exports.roomExists = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const room = await Room.findOne({ roomId: roomId });
  if (!room)
    return next(
      new AppError(
        "This room does not exist or the invite code may have expired.",
        400
      )
    );
  next();
});

exports.createRoom = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // 1. Check if user is currently not in any other room
  if (!(await isUserInAnyOtherRooms(userId))) {
    // Create a new room
    const room = await Room.create({
      roomId: req.body.roomId,
      owner: userId,
      participants: [userId],
    });

    // 2. Add new room in users' activeRooms list
    await User.findByIdAndUpdate(userId, {
      $push: { activeRooms: req.body.roomId },
    });

    // 3. On Successful room creation, send the room details in response
    return res.status(200).json({
      status: "success",
      room,
    });
  } else {
    // 4. If user is already in a room respond with an error
    return next(
      new AppError(
        "Cannot create more than 1 room for a user. Leave other rooms before creating a new one.",
        403
      )
    );
  }
});

exports.joinRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  // 1. Get Room details by ID
  const room = await Room.findOne({ roomId: roomId });

  if (req.user._id.equals(room.owner))
    return next(
      new AppError(
        "You are the host of this room. You can't join this room.",
        403
      )
    );

  // 3. Check if user is already in other rooms
  if (await isUserInAnyOtherRooms(req.user._id)) {
    return next(
      new AppError("Please leave other rooms, before joining a new one.", 403)
    );
  }

  // 4. If room has less participants than the set limit, then add the user in room participants list
  if (room.participants.length < room.settings.participantsLimit) {
    const room = await Room.findOneAndUpdate(
      { roomId: roomId },
      { $push: { participants: req.user._id } }
    );

    // 5. Add joined room in users' activeRooms list
    await User.findByIdAndUpdate(req.user._id, {
      $push: { activeRooms: roomId },
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
  let room = await Room.findOne({ roomId }).exec();

  // 1. Check if the user is the room owner
  if (!req.user._id.equals(room.owner)) {
    return next(
      new AppError(
        "You don't have the privileges to update room settings.",
        403
      )
    );
  }

  // 2. Update Room Settings
  room = await Room.findOneAndUpdate(
    { roomId: roomId },
    { settings: settings }
  );

  if (!room)
    return next(new AppError("Something went wrong. Please try again", 500));

  // 3. Send room details on success
  return res.status(200).json({
    status: "success",
    room,
  });
});

exports.roomSettings = catchAsync(async (req, res, next) => {
  const { roomId } = req.body;
  const response = await Room.findOne({ roomId: roomId });

  res.status(200).json({
    status: "success",
    settings: response.settings,
  });
});