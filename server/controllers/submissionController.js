const catchAsync = require("../utils/catchAsync");
const Submission = require("../models/submissionModel");

exports.getSubmissionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const submission = await Submission.findById(id).populate(
    "userId relatedTags"
  );

  res.status(200).json({
    status: "success",
    submission,
  });
});

exports.updateSubmission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  const submission = await Submission.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    submission,
  });
});
