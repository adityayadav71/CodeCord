const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const ProblemTag = require("./problemTagsModel");
const Counter = require("./counterModel");
const AppError = require("../utils/appError");

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
  tags: [
    {
      type: String,
      enum: [
        "Arrays",
        "Strings",
        "Dynamic Programming",
        "Math",
        "Sorting",
        "Greedy",
        "Depth-First Search",
        "Database",
        "Breadth-First Search",
        "Binary Search",
        "Tree",
        "Matrix",
        "Two Pointers",
        "Binary Tree",
        "Heap (Priority Queue)",
        "Stack",
        "Graph",
        "Queue",
        "Trie",
        "Sliding Window",
        "Linked List",
        "Backtracking",
        "Recursion",
        "Divide And Conquer",
        "Binary Search Tree",
        "Union Find",
      ],
      required: [true, "Problem should contains atleast 1 tag"],
    },
  ],
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

problemSchema.post("save", async function (doc, next) {
  try {
    for (const tagName of doc.tags) {
      const problemTag = await ProblemTag.findOneAndUpdate(
        { name: tagName },
        { $inc: { count: 1 }, $push: { problems: doc._id } }
      );
      await problemTag.save();
    }
    await Counter.findOneAndUpdate({ name: "Counter", $inc: { seq: 1 } });
    next();
  } catch (error) {
    await Problem.findOneAndDelete({ _id: doc._id });
    return next(new AppError(error, 500));
  }
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
