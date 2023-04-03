const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Problem = require("../models/problemModel");
const ProblemTags = require("../models/problemTagsModel");
const Counter = require("../models/counterModel");
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
  if (!req.body.tags) {
    return next(new AppError("Problem should contain atleast 1 tag", 404));
  }

  let counter = await Counter.findOne({ name: "counter" });
  if (!counter) {
    counter = await Counter.create({ name: "counter", seq: 0 });
  }
  await Counter.findOneAndUpdate({ name: "counter" }, { $inc: { seq: 1 } });
  const newProblem = await Problem.create({
    number: counter.seq + 1,
    title: req.body.title,
    tags:req.body.tags,
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

exports.createProblemTag = catchAsync(async (req, res, next) => {
  const name = req.body.name;
  const newTag = await ProblemTags.create({ name, count: 0 });
  if (!newTag) {
    return next(new AppError("Server Error please try again"), 500);
  }
  res.status(201).json({
    status: "success",
    newTag,
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
  const problem = await Problem.findByIdAndDelete(req.params.problemId);
  if (!problem) {
    return next(new AppError("No such problem with that ID", 404));
  }

  problem.tags.forEach(async (tagName) => {
    const tag = await ProblemTags.findOneAndUpdate(
      { name: tagName },
      { $pull: { problems: problem._id }, $inc: { count: -1 } }
    );

    if (!tag) {
      return next(new AppError("No such problem tag found", 404));
    }
  });

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.getProblemsWithTag = catchAsync(async (req, res, next) => {
  const problems = await ProblemTags.findOne({
    slug: req.params.slug,
  }).populate({
    path: "problems",
  });
  if (!problems) {
    return next(new AppError("No such tag with that name", 404));
  }
  res.status(200).json({
    status: "success",
    problems,
  });
});

exports.get4Problem = catchAsync(async (req, res, next) => {
  const easy = await Problem.aggregate([{ $sample: { size: 4 } }]);
    // .select("title number difficulty")
    // .populate({
    //   path: "stats",
    //   select: "acceptance submissions",
    //   populate: "-example -testcases -constraints -stats",
    // });
  // easy.splice(0, 2);

  const medium = await Problem.findOne({ difficulty: "medium" })
    .select("title number difficulty")
    .populate({
      path: "stats",
      select: "acceptance submissions",
      populate: "-example -testcases -constraints -stats",
    });

  const hard = await Problem.findOne({ difficulty: "hard" })
    .select("title number difficulty")
    .populate({
      path: "stats",
      select: "acceptance submissions",
      populate: "-example -testcases -constraints -stats",
    });

  const problems = easy.concat(medium, hard);

  res.status(200).json({
    status: "success",
    easy,
  });
});
