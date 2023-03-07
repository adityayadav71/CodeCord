const catchAsync = require("../utils/catchAsync");
const userProfile = require("../models/userProfileModel");

exports.getUserData = catchAsync(async (req, res, next) => {
  const userData = await userProfile.findOne({ username: req.query.username });
  res.status(200).json({
    status: "success",
    userData,
  });
});

exports.createUserProfile = catchAsync(async (req, res, next) => {
  const userData = await userProfile.create({ username: req.body.username });

  res.status(200).json({
    status: "success",
    userData,
  });
});
