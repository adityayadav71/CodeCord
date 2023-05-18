const multer = require("multer");
const AppError = require("../utils/appError");
const storage = multer.memoryStorage();
const catchAsync = require("../utils/catchAsync");
const userProfile = require("../models/userProfileModel");
const User = require("../models/userModel");

exports.upload = multer({ storage });

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const profileData = await userProfile.findOne({ userId: req.user._id });
  res.status(200).json({
    status: "success",
    profileData,
  });
});

exports.getProfileByUserName = catchAsync(async (req, res, next) => {
  const profileData = await User.findOne({ username: req.params.username })
    .populate("profile")
    .select("profile");
  res.status(200).json({
    status: "success",
    profileData: profileData.profile,
  });
});

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const data = JSON.parse(req.body.data);

  if (req.file) {
    const encode_image = req.file.buffer.toString("base64");
    const finalImg = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_image, "base64"),
    };
    userProfile.findOneAndUpdate(
      { userId },
      { ...data, avatar: finalImg },
      (err, profileData) => {
        if (err) new AppError("File upload failed!", 400);

        return res.status(200).json({
          status: "success",
          profileData,
        });
      }
    );
  } else {
    // No file uploaded, update user profile without avatar field
    const profileData = await userProfile.findOneAndUpdate({ userId }, data, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      profileData,
    });
  }
});

exports.getUserSubmissions = catchAsync(async (req, res, next) => {
  const { problemId } = req.params;

  const populated = await userProfile
    .findOne({ userId: req.user._id })
    .populate({
      path: "submissions",
      match: { problemId: problemId },
    })

  res.status(200).json({
    status: "success",
    submissions: populated.submissions,
  });
});
