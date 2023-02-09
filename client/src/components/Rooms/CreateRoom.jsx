import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import Difficulty from "../Problems/Difficulty";
import ProblemList from "../Problems/ProblemList";
import Status from "../Problems/Status";
import Tags from "../Problems/Tags";

const CreateRoom = (props) => {
  useEffect(() => {
    const closeDropdown = (event) => {
      if (
        !event.target.closest(".dropdown") ||
        event.target.closest(".searchbar")
      ) {
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
  const [activeTags, setActiveTags] = useState([]);
  const [roomType, setRoomType] = useState("Default");

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
    if (
      target.contains("easy") ||
      target.contains("medium") ||
      target.contains("hard")
    ) {
      setActiveDifficulty([]);
    } else if (
      target.contains("to-do") ||
      target.contains("solved") ||
      target.contains("attempted")
    ) {
      setActiveStatus([]);
    }
  };

  const addTag = (event) => {
    const target = event.target.textContent;
    const tagName = target.toLowerCase().replace(/\s/g, "-");
    const tag = (
      <div
        className={`flex flex-row items-center gap-x-2 h-fit w-fit px-3 ${
          tagName === "easy"
            ? "text-easyGreen"
            : tagName === "medium"
            ? "text-mediumYellow"
            : tagName === "hard"
            ? "text-hardRed"
            : ""
        } bg-accent4 rounded-xl`}
      >
        {tagName === "to-do" ? (
          <FaMinus />
        ) : tagName === "solved" ? (
          <FaCheck className="text-easyGreen" />
        ) : tagName === "attempted" ? (
          <RiPulseLine className="text-mediumYellow" />
        ) : (
          ""
        )}
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
    <div className="modal z-[9999] shadow shadow-modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary w-max flex flex-col gap-y-3 rounded-lg p-6">
      <div className="flex flex-row gap-x-3">
        <div className="flex flex-col gap-y-3 pr-12 grow border-r border-r-accent2">
          <h1 className="text-xl font-bold">Create Room</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            <div className="flex flex-row justify-center items-center bg-lightPrimary p-3 rounded-lg">
              <button className={`px-3 w-full rounded-lg ${roomType === "Default" ? "bg-accent1": ""}`} onClick={() => setRoomType("Default")}>Default</button>
              <button className={`px-3 w-full rounded-lg ${roomType === "Contest" ? "bg-accent1": ""}`} onClick={() => setRoomType("Contest")}>Contest</button>
            </div>
            <div className="flex flex-row justify-between items-center px-3 py-2 bg-lightPrimary rounded-lg">
              Participants Limit
              <FaAngleDown />
            </div>
            <div className="bg-greenBackGround rounded-lg">
              <div></div>
            </div>
            <div className="relative">
              <button className="absolute flex items-center justify-center right-0 w-1/5 h-full bg-accent1 p-3 rounded-lg">
                <IoCopy className="text-lg" />
              </button>
              <input
                className="w-full ring-2 ring-inset ring-accent1 bg-lightPrimary p-3 focus:outline-none rounded-lg"
                type="text"
                placeholder="Invite link"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 pl-12 grow-0">
          <h1 className="text-xl font-bold">Join Room</h1>
          <input
            className="ring-2 ring-inset ring-accent1 bg-lightPrimary p-3 focus:outline-none rounded-lg mb-3"
            type="text"
            placeholder="Invite Code"
          />
          <button className="w-full p-3 bg-accent1 text-xl font-bold rounded-lg">
            START
          </button>
        </div>
      </div>
      <p>Select upto 4 problems</p>
      <div className="flex flex-col gap-x-3">
        <div className="flex flex-row gap-x-3 items-center">
          <input
            type="text"
            className="ring-2 ring-inset ring-accent1 bg-lightPrimary px-3 py-2 focus:outline-none rounded-lg"
            placeholder="Search problems"
          />
          <div className="flex flex-row gap-x-3 items-center">
            <Difficulty
              isDifficultyActive={isDifficultyActive}
              handleClick={handleClick}
              addTag={addTag}
            />
            <Status
              isStatusActive={isStatusActive}
              handleClick={handleClick}
              addTag={addTag}
            />
            <Tags
              isTagsActive={isTagsActive}
              handleClick={handleClick}
              activeTags={activeTags}
              setActiveTags={setActiveTags}
            />
          </div>
        </div>
        <div></div>
        <ProblemList />
      </div>
    </div>
  );
};

export default CreateRoom;
