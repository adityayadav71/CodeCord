const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomId: { type: String, unique: [true, "Room Name should be unique"] },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  settings: {
    roomType: {
      type: String,
      default: "default",
      enum: ["Default", "Contest"],
    },
    participantsLimit: {
      type: Number,
      default: 10,
      enum: [10, 20, 30],
    },
    timeLimit: {
      type: Number,
      min: 10,
      default: 40,
      max: 120,
    },
    visibility: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },
    problems: [Number],
  },
  expiresAt: String,
});

roomSchema.index({ expireAfterSeconds: this.expiresAt / 1000 });

// roomSchema.post("save", (doc, next) => {
//   // Schedule a job to delete the room if no participants are present after 1 minute
//   setTimeout(async () => {
//     if (doc.participants.length === 0) {
//       await Room.findByIdAndDelete(doc._id);
//       console.log(
//         `Room ${room.roomId} has been deleted as there were no participants after 1 minute.`
//       );
//     }
//   }, 60 * 1000);
//   next();
// });

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
