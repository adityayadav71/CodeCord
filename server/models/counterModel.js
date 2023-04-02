const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  name: String,
  seq: Number,
});

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;