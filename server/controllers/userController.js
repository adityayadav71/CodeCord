const multer = require("multer");
const fs = require("fs");
const AppError = require("../utils/appError");
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
  const userId = JSON.parse(atob(req.cookies.jwt.split(".")[1])).id;
  const userData = await userProfile.create({
    userId: userId,
    username: req.query.username,
  });

  res.status(200).json({
    status: "success",
    userData,
  });
});

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const userId = JSON.parse(atob(req.cookies.jwt.split(".")[1])).id;
  const data = JSON.parse(req.body.data);

  const encode_image = req.file.buffer.toString("base64");
  const finalImg = {
    contentType: req.file.mimetype,
    image: Buffer.from(encode_image, "base64"),
  };

  // If a file was uploaded, stream it to GridFS
  if (req.file) {
    userProfile.findOneAndUpdate(
      { userId: userId },
      { ...data, avatar: finalImg },
      (err, userData) => {
        if (err) new AppError("File upload failed!", 400);

        return res.status(200).json({
          status: "success",
          userData,
        });
      }
    );
  } else {
    // No file uploaded, update user profile without avatar field
    const userData = await userProfile.findOneAndUpdate(
      { userId: userId },
      data
    );

    res.status(200).json({
      status: "success",
      userData,
    });
  }
});
