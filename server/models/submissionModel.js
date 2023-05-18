const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const submissionSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  problemId: {
    type: ObjectId,
    required: [true, "Problem ID is required"],
  },
  code: {
    type: String,
    required: [true, "Code is required"],
  },
  language: {
    id: Number,
    description: {
      type: String,
      required: [true, "Language is required"],
    },
  },
  testCasesPassed: Number,
  time: {
    type: String,
    required: [true, "Execution time in milliseconds is required"],
  },
  result: {
    id: Number,
    description: {
      type: String,
      required: [true, "Result is required"],
    },
  },
  relatedTags: [
    {
      type: ObjectId,
      ref: "problemTags",
    },
  ],
  notes: String,
  submittedAt: Date,
});

submissionSchema.pre("save", function () {
  this.submittedAt = Date.now();
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
