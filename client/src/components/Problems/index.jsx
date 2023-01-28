import { React, useState } from "react";
import Navbar from "../HomePage/Navbar";
import LiveRooms from "../Rooms/LiveRooms";
import Copyright from "../../utilities/Copyright";
import { FaAngleDoubleDown, FaAngleDown, FaMinus, FaCheck, FaSearch, FaCheckCircle, FaAngleDoubleUp } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import TagFilter from "./TagFilter";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import Tag from "./Tag";

const Problems = (props) => {
  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [isDifficultyActive, setDifficultyActive] = useState(false);
  const [isStatusActive, setStatusActive] = useState(false);
  const [isTagsActive, setTagsActive] = useState(false);

  function expand() {
    setTagsExpanded(true);
  }

  function collapse() {
    setTagsExpanded(false);
  }

  function handleDifficultyClick() {
    setDifficultyActive((prevState) => !prevState);
    setTagsActive(false);
    setStatusActive(false);
  }

  function handleStatusClick() {
    setDifficultyActive(false);
    setStatusActive((prevState) => !prevState);
    setTagsActive(false);
  }

  function handleTagsClick() {
    setDifficultyActive(false);
    setStatusActive(false);
    setTagsActive((prevState) => !prevState);
  }

  function hideDropDowns() {
    setDifficultyActive(false);
    setStatusActive(false);
    setTagsActive(false);
  }

  return (
    <div className="flex flex-col h-full grow items-center">
      <Navbar />
      <div className="flex flex-row w-full px-6 py-4 gap-x-6 max-w-[1440px] grow">
        <div className="flex flex-col grow">
          <div className={`relative flex flex-row flex-wrap items-start justify-start gap-x-3 gap-y-3 max-w-[723px] ${tagsExpanded ? "h-fit" : "h-10"} overflow-y-hidden mb-3`}>
            <Tag tagName="Arrays" number="553" />
            <Tag tagName="Strings" number="645" />
            <Tag tagName="Dynamic Programming" number="323" />
            <Tag tagName="Math" number="303" />
            <Tag tagName="Sorting" number="210" />
            <Tag tagName="Greedy" number="120" />
            <Tag tagName="Depth-First Search" number="87" />
            <Tag tagName="Database" number="45" />
            <Tag tagName="Breadth-First Search" number="98" />
            <Tag tagName="Binary Search" number="334" />
            <Tag tagName="Tree" number="454" />
            <Tag tagName="Matrix" number="543" />
            {tagsExpanded ? (
              <button className="absolute flex flex-row items-center gap-x-3 px-3 right-0 bottom-0 text-grey1 bg-primary" onClick={collapse}>
                Collapse
                <FaAngleDoubleUp />
              </button>
            ) : (
              <button className="absolute flex flex-row items-center gap-x-3 px-3 right-0 text-grey1 bg-primary" onClick={expand}>
                Expand
                <FaAngleDoubleDown />
              </button>
            )}
          </div>
          <div className="flex flex-row gap-x-3">
            <div className="relative">
              <div
                className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg"
                onClick={handleDifficultyClick}
              >
                Difficulty
                {isDifficultyActive ? <FaAngleDown className="transition-all duration-300" /> : <FaAngleDown className="rotate-180 transition-all duration-300" />}
              </div>
              <div
                className={`absolute transition-all duration-100 ${
                  isDifficultyActive ? "opacity-1 scale-100" : "opacity-0 scale-0"
                } top-16 shadow shadow-dropDown left-0 p-3 w-40 hover:cursor-pointer bg-secondary rounded-xl`}
              >
                <div className="hover:bg-accent3 mb-3 text-easyGreen rounded-lg px-3 py-1" value="Easy">
                  Easy
                </div>
                <div className="hover:bg-accent3 mb-3 text-mediumYellow rounded-lg px-3 py-1" value="Medium">
                  Medium
                </div>
                <div className="hover:bg-accent3 text-hardRed rounded-lg px-3 py-1" value="Hard">
                  Hard
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg"
                onClick={handleStatusClick}
              >
                Status
                {isStatusActive ? <FaAngleDown className="transition-all duration-300" /> : <FaAngleDown className="rotate-180 transition-all duration-300" />}
              </div>
              <div
                className={`absolute transition-all duration-100 ${
                  isStatusActive ? "opacity-1 scale-100" : "opacity-0 scale-0"
                } top-16 shadow shadow-dropDown left-0 p-3 w-40 hover:cursor-pointer bg-secondary rounded-xl`}
              >
                <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 mb-3 rounded-lg px-3 py-1" value="Easy">
                  <FaMinus />
                  To Do
                </div>
                <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 mb-3 rounded-lg px-3 py-1" value="Medium">
                  <FaCheck className="text-easyGreen" />
                  Solved
                </div>
                <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 rounded-lg px-3 py-1" value="Hard">
                  <RiPulseLine className="text-mediumYellow" />
                  Attempted
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg"
                onClick={handleTagsClick}
              >
                Tags
                {isTagsActive ? <FaAngleDown className="transition-all duration-300" /> : <FaAngleDown className="rotate-180 transition-all duration-300" />}
              </div>
              <TagFilter isTagsActive={isTagsActive} />
            </div>
            <div className={`flex flex-row items-center gap-x-3 h-fit w-fit p-3 focus:outline-none bg-secondary rounded-lg`} onClick={hideDropDowns}>
              <FaSearch />
              <input className="h-fit w-fit focus:outline-none bg-secondary" type="text" placeholder="Search questions" />
            </div>
            <button className="flex flex-row gap-x-3 items-center h-fit w-fit ml-auto p-3 text-accent1 hover:text-lightAccent1 rounded-lg">
              <FaCheckCircle className="text-xl" />
              Create Contest
            </button>
          </div>
          <ProblemList />
          <Pagination />
        </div>
        <LiveRooms />
      </div>
      <Copyright />
    </div>
  );
};

export default Problems;
