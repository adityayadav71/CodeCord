const express = require('express');
const authController = require('../controllers/authController');
const problemController = require('../controllers/problemController');

const router = express.Router();

router
  .route('/')
  .get(problemController.getAllProblems)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    problemController.createProblem
  );

router
  .route('/:problemId')
  .get(problemController.getProblem)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    // problemController.uploadProblemImages,
    // problemController.resizeProblemImages,
    problemController.updateProblem
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    problemController.deleteProblem
  );

module.exports = router;
