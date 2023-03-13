import { useState } from "react";
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Description = ({ isRoom }) => {
  const [activeTab, setActiveTab] = useState("Description");
  return (
    <div className="flex flex-col h-full">
      {!isRoom && (
        <nav className="flex items-center justify-between px-3 py-3 border-b border-lightAccent3">
          <button className={`grow px-6 py-2 ${activeTab === "Description" ? "bg-lightSecondary text-white" : ""} text-grey2 hover:text-white rounded-lg`} onClick={() => setActiveTab("Description")}>
            Description
          </button>
          <button className={`grow px-6 py-2 ${activeTab === "Submissions" ? "bg-lightSecondary text-white" : ""} text-grey2 hover:text-white rounded-lg`} onClick={() => setActiveTab("Submissions")}>
            Submissions
          </button>
          <button className={`grow px-6 py-2 ${activeTab === "Solutions" ? "bg-lightSecondary text-white" : ""} text-grey2 hover:text-white rounded-lg`} onClick={() => setActiveTab("Solutions")}>
            Solutions
          </button>
        </nav>
      )}
      <div className="overflow-y-scroll px-3 pt-6">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl mb-2">1. Problem Title</h1>
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
          <div className="px-3 bg-tagYellowBg text-mediumYellow font-bold rounded-full">Medium</div>
          <div className="flex flex-row gap-x-1 items-center">
            <AiOutlineLike className="text-xl" />
            <p className="text-grey1 font-bold">25.6K</p>
          </div>
          <div className="flex flex-row gap-x-1 items-center">
            <AiOutlineDislike className="text-xl" />
            <p className="text-grey1 font-bold">2K</p>
          </div>
        </div>
        <div className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error possimus non ex molestiae ipsam laboriosam placeat exercitationem corporis omnis id incidunt hic modi, soluta animi nemo.
          Numquam eius fugiat cum.
        </div>
        <div className="mb-6">
          <h1 className="mb-6 font-bold">Example 1:</h1>
          <div className="px-3 py-2 rounded-lg bg-lightAccent3">
            <span className="font-bold">Input:</span> s = "abcabcbb" <br /> <span className="font-bold">Output:</span> 3 <br />
            <span className="font-bold">Explanation:</span> The answer is "abc", with the length of 3.
          </div>
        </div>
        <div className="mb-6">
          <h1 className="mb-6 font-bold">Example 2:</h1>
          <div className="px-3 py-2 rounded-lg bg-lightAccent3">
            <span className="font-bold">Input:</span> s = "abcabcbb" <br /> <span className="font-bold">Output:</span> 3 <br />
            <span className="font-bold">Explanation:</span> The answer is "abc", with the length of 3.
          </div>
        </div>
        <div className="mb-6">
          <h1 className="mb-3 font-bold">Constraints:</h1>
          <div className="px-3 py-2">
            <ul className="list-disc list-inside">
              <li>{`0 <= s.length <= 5 * 104`}</li>
              <li>s consists of English letters, digits, symbols and spaces.</li>
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
