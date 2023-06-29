const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Room name is required"],
      unique: [true, "Room name should be unique"],
    },
    roomId: { type: String, unique: [true, "Room ID should be unique"] },
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
      difficulty: String,
    },
    expiresAt: Date,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

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
