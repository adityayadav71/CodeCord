const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  username: String,
  avatar: {
    type: {
      contentType: String,
      image: Object,
    },
  },
  about: String,
  roomsCreated: {
    type: Array,
    default: [],
  },
  roomsJoined: {
    type: Array,
    default: [],
  },
  submissions: {
    type: [
      {
        type: ObjectId,
        ref: "Submission",
      },
    ],
    default: [],
  },
  totalSubmissions: { type: Number, default: 0 },
  numberOfSubmissions: { type: [Number, Number, Number], default: [0, 0, 0] },
  country: String,
  skills: [String],
  friends: [
    {
      type: ObjectId,
      // required: [true, "User ID is required"],
      ref: "User",
    },
  ],
  socials: Array,
});

const userProfile = mongoose.model("Profile", userProfileSchema);

module.exports = userProfile;
