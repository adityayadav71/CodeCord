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
  slug: {
    type: String,
    slug: "title",
    unique: true,
  },
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
