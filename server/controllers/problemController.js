const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Problem = require("../models/problemModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllProblems = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Problem, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const problems = await features.query;
  res.status(200).json({
    status: "success",
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
  const problemsStr = req.query.problems;
  const problemsArr = problemsStr.split(",");
  const problems = await Problem.find({ slug: { $in: problemsArr } }).sort({
    number: 1,
  });
  if (!problems || problems.length === 0) {
    return next(
      new AppError("No such problems found with the given slugs", 404)
    );
  }
  res.status(200).json({
    status: "success",
    problems,
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
