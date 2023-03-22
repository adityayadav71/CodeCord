import { useContext, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ProblemContext } from "./index";

const Description = ({ isRoom }) => {
  const { problems } = useContext(ProblemContext);
  const [activeTab, setActiveTab] = useState("Description");
  return (
    <div className="flex flex-col h-full">
      {!isRoom && (
        <nav className="flex items-center justify-between px-3 py-3 border-b border-lightAccent3">
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Description" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => setActiveTab("Description")}
          >
            Description
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Submissions" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => setActiveTab("Submissions")}
          >
            Submissions
          </button>
          <button
            className={`grow px-6 py-2 ${
              activeTab === "Solutions" ? "bg-lightSecondary text-white" : ""
            } text-grey2 hover:text-white rounded-lg`}
            onClick={() => setActiveTab("Solutions")}
          >
            Solutions
          </button>
        </nav>
      )}
      <div className="overflow-y-scroll px-3 pt-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl mb-2">{problems?.number}. {problems?.title}</h1>
          {isRoom && (
            <div className="flex item-center gap-x-3">
              <button className="p-2 rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300">
                <FaAngleLeft />
              </button>
              <button className="p-2 rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300">
                <FaAngleRight />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-x-5 mb-6">
          <div className="px-3 bg-tagYellowBg text-mediumYellow font-bold rounded-full">
            {problems?.difficulty}
          </div>
          <div className="flex flex-row gap-x-1 items-center">
            <AiOutlineLike className="text-xl" />
            <p className="text-grey1 font-bold">25.6K</p>
          </div>
          <div className="flex flex-row gap-x-1 items-center">
            <AiOutlineDislike className="text-xl" />
            <p className="text-grey1 font-bold">2K</p>
          </div>
        </div>
        <div className="mb-6">{problems?.statement}</div>
        {problems?.example?.map((example, i) => (
          <div className="mb-6" key={i}>
            <h1 className="mb-6 font-bold">Example {i + 1}:</h1>
            <div className="px-3 py-2 rounded-lg bg-lightAccent3">
              <span className="font-bold">Input:</span> {example.input} <br />
              <span className="font-bold">Output:</span> {example.output} <br />
              {example?.explanation && (
                <>
                  <span className="font-bold">Explanation:</span>
                  {example?.explanation}
                </>
              )}
            </div>
          </div>
        ))}
        <div className="mb-6">
          <h1 className="mb-3 font-bold">Constraints:</h1>
          <div className="px-3 py-2">
            <ul className="list-disc list-inside">
              {problems?.constraints?.map((constraint, i) => (
                <li key={i}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center gap-x-5 mt-12 mb-12">
          <div className="flex flex-row items-center gap-x-3">
            <p className="text-grey1 text-base">Accepted</p>
            <p className="text-xl font-bold">5M</p>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <p className="text-grey1 text-base">Submissions</p>
            <p className="text-xl font-bold">15M</p>
          </div>
          <div className="flex flex-row items-center gap-x-3">
            <p className="text-grey1 text-base">Acceptance</p>
            <p className="text-xl font-bold"> 50.0%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
