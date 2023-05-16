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
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      {!isRoom && (
        <nav className="flex items-center justify-between gap-3 px-3 py-3 border-b border-lightAccent3">
          <button
            className={`grow px-6 py-2 ${
              activeTab === 1 ? "bg-lightSecondary text-white" : ""
            } text-grey2 font-bold hover:bg-lightAccent3 hover:text-white rounded-lg`}
            onClick={() => {
              setActiveTab(1);
              setDisplaySubmission(false);
            }}
          >
            Description
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === 2 ? "bg-lightSecondary text-white" : ""
            } text-grey2 font-bold hover:bg-lightAccent3 hover:text-white rounded-lg`}
            onClick={() => {
              setActiveTab(2);
              setDisplaySubmission(false);
            }}
          >
            Solutions
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === 3 ? "bg-lightSecondary text-white" : ""
            } text-grey2 font-bold hover:bg-lightAccent3 hover:text-white rounded-lg`}
            onClick={() => setActiveTab(3)}
          >
            Submissions
          </button>
        </nav>
      )}
      {activeTab === 1 ? (
        <Description
          isRoom={isRoom}
          handleProblemChange={handleProblemChange}
        />
      ) : activeTab === 2 ? (
        <Solutions isRoom={isRoom} />
      ) : (
        <Submissions
          isRoom={isRoom}
          handleSubmissionDisplay={handleSubmissionDisplay}
        />
      )}
    </>
  );
};

export default ProblemPanel;
