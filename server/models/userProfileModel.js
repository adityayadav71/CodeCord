const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
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
  submissions: { type: Array, default: [] },
  totalSubmissions: { type: Number, default: 0 },
  numberOfSubmissions: { type: [Number, Number, Number], default: [0, 0, 0] },
  country: String,
  skills: [String],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
  ],
  socials: Array,
});

const userProfile = mongoose.model("Profile", userProfileSchema);

module.exports = userProfile;
