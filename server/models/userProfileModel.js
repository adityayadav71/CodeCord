const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
  },
  avatar: {
    type: String,
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
  friends: [String],
  socials: Array,
});

const userProfile = mongoose.model("Profile", userProfileSchema);

module.exports = userProfile;
