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

router.get("/selected", problemController.getProblem);

router
  .route("/selected/:id")
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

router.get("/tags", problemController.getAllProblemTags);
router.get("/tag/:slug", problemController.getProblemsWithTag);

router.get("/set/four-problems", problemController.get4Problem);

router.post(
  "/addQuestionTag",
  authController.protect,
  authController.restrictTo("admin"),
  problemController.createProblemTag
);

module.exports = router;
