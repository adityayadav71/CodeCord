const multer = require("multer");
const storage = multer.memoryStorage();
const catchAsync = require("../utils/catchAsync");
const userProfile = require("../models/userProfileModel");

exports.upload = multer({ storage });

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

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const data = JSON.parse(req.body.data);
  const username = data.username;

  // If a file was uploaded, stream it to GridFS
  if (req.file) {
    const binaryData = req.file.buffer;
    userProfile.findOneAndUpdate(
      { username },
      { ...data, avatar: btoa(unescape(encodeURIComponent(binaryData))) },
      (err, userData) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            status: "error",
            message: "Error updating user profile.",
          });
        }

        return res.status(200).json({
          status: "success",
          userData,
        });
      }
    );
  } else {
    // No file uploaded, update user profile without avatar field
    const userData = await userProfile.findOneAndUpdate({ username }, data);

    res.status(200).json({
      status: "success",
      userData,
    });
  }
});
