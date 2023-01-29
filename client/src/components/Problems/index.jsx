import { React, useState, useEffect } from "react";
import Navbar from "../HomePage/Navbar";
import LiveRooms from "../Rooms/LiveRooms";
import Copyright from "../../utilities/Copyright";
import { FaAngleDoubleDown, FaSearch, FaCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import Topic from "./Topic";
import Difficulty from "./Difficulty";
import Status from "./Status";
import Tags from "./Tags";

const Problems = (props) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown") || event.target.closest(".searchbar")) {
        setDifficultyActive(false);
        setTagsActive(false);
        setStatusActive(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  const [tagsExpanded, setTagsExpanded] = useState(false);
  const [isDifficultyActive, setDifficultyActive] = useState(false);
  const [isStatusActive, setStatusActive] = useState(false);
  const [isTagsActive, setTagsActive] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  function toggleTags() {
    setTagsExpanded((prev) => !prev);
  }

  function handleClick(event) {
    const target = event.target.closest(".dropdown").dataset.value;
    if (target === "Difficulty") {
      setDifficultyActive((prevState) => !prevState);
      setStatusActive(false);
      setTagsActive(false);
    } else if (target === "Status") {
      setDifficultyActive(false);
      setStatusActive((prevState) => !prevState);
      setTagsActive(false);
    } else if (target === "Tags") {
      setDifficultyActive(false);
      setTagsActive((prevState) => !prevState);
      setStatusActive(false);
    }
  }

  function addTag(event) {
    const tag = (
      <div className="flex flex-row items-center gap-x-2 h-fit w-fit px-3 bg-accent4 rounded-xl">
        {event.target.textContent}
        <button>
          <FaRegTimesCircle />
        </button>
      </div>
    );
    const index = activeTags.findIndex((tag) => {
      tag.props.children[0] == event.target.textContent;
    });
    if (index == -1) {
      setActiveTags((prevTags) => [...prevTags, tag]);
    }
  }

  return (
    <div className="flex flex-col h-full grow items-center">
      <Navbar />
      <div className="flex flex-row w-full px-6 py-4 gap-x-6 max-w-[1440px] grow">
        <div className="flex flex-col grow">
          <div className={`relative flex flex-row flex-wrap items-start justify-start gap-x-3 gap-y-3 max-w-[723px] ${tagsExpanded ? "h-fit" : "h-10"} overflow-y-hidden mb-3`}>
            <Topic tagName="Arrays" number="553" />
            <Topic tagName="Strings" number="645" />
            <Topic tagName="Dynamic Programming" number="323" />
            <Topic tagName="Math" number="303" />
            <Topic tagName="Sorting" number="210" />
            <Topic tagName="Greedy" number="120" />
            <Topic tagName="Depth-First Search" number="87" />
            <Topic tagName="Database" number="45" />
            <Topic tagName="Breadth-First Search" number="98" />
            <Topic tagName="Binary Search" number="334" />
            <Topic tagName="Tree" number="454" />
            <Topic tagName="Matrix" number="543" />
            <button className={`absolute flex flex-row items-center gap-x-3 px-3 ${tagsExpanded ? "right-0 bottom-0" : "right-0"} text-grey1 bg-primary`} onClick={toggleTags}>
              {tagsExpanded ? "Collapse" : "Expand"}
              <FaAngleDoubleDown className={`${tagsExpanded ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div className="flex flex-row gap-x-3">
            <Difficulty isDifficultyActive={isDifficultyActive} handleClick={handleClick} addTag={addTag} />
            <Status isStatusActive={isStatusActive} handleClick={handleClick} addTag={addTag} />
            <Tags isTagsActive={isTagsActive} handleClick={handleClick} addTag={addTag} />
            <div className={`searchbar relative h-fit w-fit flex flex-row items-center`}>
              <FaSearch className="absolute left-2" />
              <input className="h-fit w-fit p-3 pl-8 focus:outline-none focus:bg-grey3 bg-secondary rounded-lg" type="text" placeholder="Search questions" />
            </div>
            <button className="flex flex-row gap-x-3 items-center h-fit w-fit ml-auto p-3 text-accent1 hover:text-lightAccent1 rounded-lg">
              <FaCheckCircle className="text-xl" />
              Create Contest
            </button>
          </div>
          <div className="flex flex-row py-3 gap-3 flex-wrap max-w-[723px] h-fit">{activeTags}</div>
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
