const express = require("express");
const codeExecutionController = require("../controllers/codeExecutionController");

const router = express.Router();

router.get("/:token", codeExecutionController.getSubmission)
router.post("/run", codeExecutionController.runCode)

module.exports = router;
