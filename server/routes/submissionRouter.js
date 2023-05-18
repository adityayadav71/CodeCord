const express = require("express");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.get("/:id", submissionController.getSubmissionById);
router.post("/:id", submissionController.updateSubmission);

module.exports = router;
