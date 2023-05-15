const catchAsync = require("../utils/catchAsync");
const Submission = require("../models/submissionModel");

exports.getSubmissionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const submission = await Submission.findById(id).populate("userId");

  res.status(200).json({
    status: "success",
    submission,
  });
});
