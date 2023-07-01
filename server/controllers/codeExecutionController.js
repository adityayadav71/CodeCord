const catchAsync = require("../utils/catchAsync");
const axios = require("axios");

exports.runCode = catchAsync(async (req, res, next) => {
  const data = req.body;
  const response = await axios.post(
    `${process.env.JUDGE0_API_URL}/submissions/?base64_encoded=false&wait=false`,
    data
  );

  res.status(200).json({
    status: "success",
    token: response.data.token,
  });
});

exports.getSubmission = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const response = await axios.get(
    `${process.env.JUDGE0_API_URL}/submissions/${token}?base64_encoded=false`
  );

  res.status(200).json({
    status: "success",
    result: response.data,
  });
});
