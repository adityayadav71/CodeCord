const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

mongoose.plugin(slug);

const problemTagsSchema = new mongoose.Schema({
  name: {
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
    unique: [true, "Tag is already created"],
    required: [true, "Tag name is required"],
  },
  count: Number,
  problems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
});

const ProblemTags = mongoose.model("problemTags", problemTagsSchema);
module.exports = ProblemTags;
