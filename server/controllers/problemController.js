const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Problem = require("../models/problemModel");

exports.getAllProblems = catchAsync(async (req, res, next) => {
  // '-example -testcases -constraints -stats'
  const problems = await Problem.find({}).populate({
    path: "stats",
    select: "acceptance submissions",
    populate: "-example -testcases -constraints -stats",
  });
  res.status(200).json({
    result: "success",
    problems,
  });
});

exports.createProblem = catchAsync(async (req, res, next) => {
  const newProblem = await Problem.create({
    number: req.body.number,
    title: req.body.title,
    statement: req.body.statement,
    difficulty: req.body.difficulty,
    example: req.body.example,
    testcases: req.body.testcases,
    constraints: req.body.constraints,
  });

  res.status(201).json({
    status: "success",
    newProblem,
  });
});

exports.getProblem = catchAsync(async (req, res, next) => {
  const problem = await Problem.findOne({ slug: req.params.slug })
  if (!problem) {
    return next(new AppError("No such problem found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    problem,
  });
});

exports.updateProblem = catchAsync(async (req, res, next) => {
  const problem = await Model.findByIdAndUpdate(
    req.params.problemId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!problem) {
    return next(new AppError("No such problem found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    problem,
  });
});

exports.deleteProblem = catchAsync(async (req, res, next) => {
  const problem = await Model.findByIdAndDelete(req.params.id);

  if (!problem) {
    return next(new AppError("No such problem with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
