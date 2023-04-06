const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

class Room {
  roomId;

  constructor(req) {
    // this.participants = participants;
    req.io.on("connection", (socket) => {
      this.roomId = socket.id;

      socket.on("create-room", (cb) => {
        try {
          this.create(req.body.settings, req.user.id, socket.id);
          socket.join(socket.id);
        } catch (error) {
          cb("Couldn't create a room. Please try again.", err);
        }
      });

      socket.on("join-room", (data, cb) => {
        try {
          this.join(req.body.roomId);
          socket.join(req.body.roomId);
          socket.to(req.body.roomId).broadcast.emit("user-joined", data);
        } catch (err) {
          cb("Couldn't join this room. Please try again.", err);
        }
      });

      socket.on("leave-room", () => {
        try {
          socket.leave(req.body.roomId);
          this.leave(req.body.roomId, req.user.id);
        } catch (err) {
          cb("Couldn't leave this room. Please try again.", err);
        }
      });
    });
  }

  async create(settings, ownerId, socketId) {
    await Room.create({
      owner: ownerId,
      roomId: socketId,
      participants: [ownerId],
      settings,
    });
    await Room.findOne(
      { roomId: socketId },
      { $push: { participants: ownerId } }
    );
  }

  async join(roomId, userId) {
    await Room.findOne({ roomId }, { $push: { participants: userId } });
  }

  async leave(roomId, userId) {
    await Room.findOne({ roomId }, { $pull: { participants: userId } });
  }
}

exports.createSocket = catchAsync(async (req, res, next) => {
  const room = new Room([req.body.owner], req);

  res.status(201).json({
    status: "success",
    room,
  });
});
