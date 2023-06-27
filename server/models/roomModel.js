const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new mongoose.Schema(
  {
    roomId: { type: String, unique: [true, "Room Name should be unique"] },

    owner: {
      type: ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: ObjectId,
        ref: "User",
        unique: [true, "This participant already exists."],
      },
    ],
    startedAt: {
      type: Date,
      default: null,
    },
    settings: {
      roomType: {
        type: String,
        default: "default",
        enum: ["Default", "Contest"],
      },
      participantsLimit: {
        type: Number,
        default: 10,
        enum: [10, 20, 50],
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
      problems: { type: [Number], default: [1, 2, 3, 4] },
    },
    expiresAt: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

roomSchema.virtual("remainingTime").get(function () {
  if (!this.startedAt) return 0; // Room hasn't started yet

  const currentTime = new Date();
  const endTime = new Date(
    this.startedAt.getTime() + this.settings.timeLimit * 1000
  );
  const remainingTimeInSeconds = Math.floor((endTime - currentTime) / 1000);
  return Math.max(0, remainingTimeInSeconds); // Ensures remaining time is never negative
});

// Create a TTL index on the `updatedAt` field that expires documents with an empty `participants` array
roomSchema.index(
  { updatedAt: 1 },
  {
    expireAfterSeconds: 0,
    partialFilterExpression: { participants: { $size: 0 } },
  }
);

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
