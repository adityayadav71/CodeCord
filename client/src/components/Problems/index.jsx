import { React, useState, useEffect } from "react";
import Navbar from "../HomePage/Navbar";
import LiveRooms from "../Rooms/LiveRooms";
import Copyright from "../../utilities/Copyright";
import { FaSearch, FaCheckCircle, FaRegTimesCircle, FaUndo, FaMinus, FaCheck } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import Pagination from "./Pagination";
import ProblemList from "./ProblemList";
import Difficulty from "./Difficulty";
import Status from "./Status";
import Tags from "./Tags";
import TopicFilter from "./TopicFilter";

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

  const [isDifficultyActive, setDifficultyActive] = useState(false);
  const [isStatusActive, setStatusActive] = useState(false);
  const [isTagsActive, setTagsActive] = useState(false);
  const [activeDifficulty, setActiveDifficulty] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const handleClick = (event) => {
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
  };

  const removeTag = (event) => {
    const target = event.currentTarget.classList;
    if (target.contains("easy") || target.contains("medium") || target.contains("hard")) {
      setActiveDifficulty([]);
    } else if (target.contains("to-do") || target.contains("solved") || target.contains("attempted")) {
      setActiveStatus([]);
    }
  };

  const addTag = (event) => {
    const target = event.target.textContent;
    const tagName = target.toLowerCase().replace(/\s/g, "-");
    const tag = (
      <div
        className={`flex flex-row items-center gap-x-2 h-fit w-fit px-3 ${
          tagName === "easy" ? "text-easyGreen" : tagName === "medium" ? "text-mediumYellow" : tagName === "hard" ? "text-hardRed" : ""
        } bg-accent4 rounded-xl`}
      >
        {tagName === "to-do" ? <FaMinus /> : tagName === "solved" ? <FaCheck className="text-easyGreen" /> : tagName === "attempted" ? <RiPulseLine className="text-mediumYellow" /> : ""}
        {target}
        <button className={tagName} onClick={removeTag}>
          <FaRegTimesCircle className="hover:text-accent1" />
        </button>
      </div>
    );
    setStatusActive(false);
    setDifficultyActive(false);
    if (event.target.closest(".difficulty-dropdown")) {
      setActiveDifficulty([tag]);
    } else if (event.target.closest(".status-dropdown")) {
      setActiveStatus([tag]);
    }
  };

  const resetFilters = () => {
    setActiveDifficulty(() => []);
    setActiveStatus(() => []);
    setActiveTags(() => []);
  };

  return (
    <div className="flex flex-col h-full grow items-center">
      <Navbar />
      <div className="flex flex-row w-full px-6 py-4 gap-x-6 max-w-[1440px] grow">
        <div className="flex flex-col grow">
          <TopicFilter />
          <div className="flex flex-row gap-x-3">
            <Difficulty isDifficultyActive={isDifficultyActive} handleClick={handleClick} addTag={addTag} />
            <Status isStatusActive={isStatusActive} handleClick={handleClick} addTag={addTag} />
            <Tags isTagsActive={isTagsActive} handleClick={handleClick} activeTags={activeTags} setActiveTags={setActiveTags} />
            <div className={`searchbar relative h-fit w-fit flex flex-row items-center`}>
              <FaSearch className="absolute left-2" />
              <input className="h-fit w-fit p-3 pl-8 focus:outline-none focus:bg-grey3 bg-secondary rounded-lg" type="text" placeholder="Search questions" />
            </div>
            <button className="flex flex-row gap-x-3 items-center h-fit w-fit ml-auto p-3 text-accent1 hover:text-lightAccent1 rounded-lg">
              <FaCheckCircle className="text-xl" />
              Create Contest
            </button>
          </div>
          <div className="flex flex-row">
            <div className="relative grow flex flex-row py-3 gap-3 flex-wrap max-w-[723px] h-fit">
              {activeDifficulty}
              {activeStatus}
              {activeTags}
            </div>
            {activeDifficulty.length === 0 && activeStatus.length === 0 && activeTags.length === 0 ? (
              ""
            ) : (
              <button className="self-start ml-auto flex flex-row items-center p-3 gap-x-3 text-grey1" onClick={resetFilters}>
                <FaUndo />
                Reset
              </button>
            )}
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
