import { useState } from "react";

import Description from "./Description";
import Submissions from "./Submissions";
import Solutions from "./Solutions";

const ProblemPanel = ({
  isRoom,
  handleSubmissionDisplay,
  handleProblemChange,
  setDisplaySubmission,
}) => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
    <>
      {!isRoom && (
        <nav className="flex items-center justify-between px-3 py-3 border-b border-lightAccent3">
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Description" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => {
              setActiveTab("Description");
              setDisplaySubmission(false);
            }}
          >
            Description
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Solutions" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => {
              setActiveTab("Solutions");
              setDisplaySubmission(false);
            }}
          >
            Solutions
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Submissions" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => setActiveTab("Submissions")}
          >
            Submissions
          </button>
        </nav>
      )}
      {activeTab === "Description" ? (
        <Description
          isRoom={isRoom}
          handleProblemChange={handleProblemChange}
        />
      ) : activeTab === "Submissions" ? (
        <Submissions
          isRoom={isRoom}
          handleSubmissionDisplay={handleSubmissionDisplay}
        />
      ) : (
        <Solutions isRoom={isRoom} />
      )}
    </>
  );
};

export default ProblemPanel;
