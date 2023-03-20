const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: [true, "This problem number already exists."],
  },
  statement: String,
  difficulty: String,
  example: [
    {
      input: String,
      output: String,
      explanation: String,
    },
  ],
  testcases: {
    type: [
      {
        input: String,
        output: String,
      },
    ],
    required: [true, "At least one test case is required."],
  },
  constraints: [String],
  solutions: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Solution",
    },
  ],
  stats: {
    type: {
      likes: {
        type: Number,
        default: 0,
      },
      dislikes: {
        type: Number,
        default: 0,
      },
      submissions: {
        type: Number,
        default: 0,
      },
      accepted: {
        type: Number,
        default: 0,
      },
      acceptance: {
        type: Number,
        default: 0,
      },
    },
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
