const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const problemSchema = new mongoose.Schema({
  number: {
    type: Number,
    unique: [true, "This problem number already exists."],
  },
  title: {
    type: String,
    trim: true,
    unique: [true, "Problem title should be unique"],
    required: [true, "Problem should contain problem title"],
  },
  statement: {
    type: String,
    required: [true, "Problem Statement cannot be empty."],
  },
  difficulty: { type: String, required: [true, "Difficulty is required."] },
  tags: {
    type: [String],
    required: [true, "At least one tag is required."],
  },
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
        input: [String],
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
      likes: Number,
      dislikes: Number,
      submissions: Number,
      accepted: Number,
      acceptance: Number,
    },
    default: {
      likes: 0,
      dislikes: 0,
      submissions: 0,
      accepted: 0,
      acceptance: 0,
    },
  },
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
