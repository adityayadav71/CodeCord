import React from "react";
import Problem from "./Problem";

const ProblemList = (props) => {
  return (
    <div className="flex flex-col bg-secondary rounded-xl mb-3 grow overflow-clip">
      <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
        <div className="w-20">Status</div>
        <div className="grow">Title</div>
        <div className="w-40">Acceptance</div>
        <div className="w-40">Difficulty</div>
        <div className="w-40">Submissions</div>
      </div>
      <Problem number="1" name="Two Sum" acceptance="49.4" difficulty="easy" submissionCount="1" status="solved" />
      <Problem number="2" name="Add Two Numbers" acceptance="40.1" difficulty="medium" submissionCount="2" status="attempted" />
      <Problem number="3" name="Median of Two Sorted Arrays" acceptance="35.8" difficulty="hard" submissionCount="7" status="solved" />
      <Problem number="4" name="Check Palindrome" acceptance="35.8" difficulty="easy" submissionCount="0" status="" />
      <Problem number="5" name="ZigZag Conversion" acceptance="43.5" difficulty="medium" submissionCount="3" status="solved" />
      <Problem number="6" name="Integer to Roman" acceptance="61.8" difficulty="medium" submissionCount="1" status="solved" />
      <Problem number="7" name="3Sum" acceptance="32.4" difficulty="medium" submissionCount="4" status="attempted" />
    </div>
  );
};

export default ProblemList;
