const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  
});

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;
