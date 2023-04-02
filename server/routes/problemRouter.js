const express = require("express");
const authController = require("../controllers/authController");
const problemController = require("../controllers/problemController");

const router = express.Router();

router
  .route("/")
  .get(problemController.getAllProblems)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    problemController.createProblem
  );

router
  .route("/selected")
  .get(problemController.getProblem)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    problemController.updateProblem
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    problemController.deleteProblem
  );

router.get("/tag/:slug", problemController.getProblemsWithTag);

router.get("/set/four-problems", problemController.get4Problem);

router.post(
  "/addQuestionTag",
  authController.protect,
  authController.restrictTo("admin"),
  problemController.createProblemTag
);

module.exports = router;
