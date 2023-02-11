import { useEffect, useState } from "react";
import {
  FaUndo,
  FaRegTimesCircle,
  FaMinus,
  FaCheck,
  FaSearch,
} from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";

import Difficulty from "../Problems/Difficulty";
import ProblemList from "../Problems/ProblemList";
import Pagination from "../Problems/Pagination";
import Status from "../Problems/Status";
import Tags from "../Problems/Tags";
import RoomTypeSelector from "./RoomTypeSelector";
import ParticipantLimit from "./ParticipantLimit";
import RoomDuration from "./RoomDuration";
import RoomInviteLink from "./RoomInviteLink";
import RoomVisibility from "./RoomVisibility";

const CreateRoom = ({ isContest }) => {
  const updateTimeLimit = () => {
    const slider = document.getElementById("slider");
    const timeLimit = slider.value;
    const percent = (timeLimit * 100) / 120;
    slider.style.background = `linear-gradient(90deg, ${
      "rgb(44 187 93)" + percent + "%"
    } , ${"rgb(41 77 53)" + percent + "%"})`;
    setTimeLimit(timeLimit);
  };

  useEffect(() => {
    sethrs(() => {
      const hours = toHoursAndMinutes(timeLimit).hours;
      if (hours === 1) return `${hours} hr`;
      else if (hours > 1) return `${hours} hrs`;
    });
    setmins(() => {
      const mins = toHoursAndMinutes(timeLimit).minutes;
      if (mins === 1) return `${mins} min`;
      else if (mins > 1) return `${mins} mins`;
    });
  });

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".dropdown")) {
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
  const [isLimitActive, setLimitActive] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(10);
  const [activeDifficulty, setActiveDifficulty] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  const [roomType, setRoomType] = useState(isContest ? "Contest" : "Default");
  const [selected, setSelected] = useState(0);
  const [visibility, setVisibility] = useState("private");
  const [timeLimit, setTimeLimit] = useState(10);
  const [hrs, sethrs] = useState("");
  const [mins, setmins] = useState("10 mins");

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

  const resetFilters = () => {
    setActiveDifficulty(() => []);
    setActiveStatus(() => []);
    setActiveTags(() => []);
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  return (
    <div>
      <div className="absolute top-0 left-0 h-full w-full z-[9998]"></div>
      <div className="modal fixed z-[9999] h-[95%] w-[60%] overflow-y-hidden shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightPrimary flex flex-col gap-y-3 rounded-lg p-6">
        <div className="flex flex-row gap-x-3 mb-3">
          <div className="flex flex-col gap-y-3 pr-12 grow border-r border-r-accent2">
            <div className="flex flex-row gap-x-3 mb-3">
              <h1 className="text-xl font-bold">Create Room</h1>
              <RoomVisibility
                visibility={visibility}
                setVisibility={setVisibility}
              />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              <RoomTypeSelector roomType={roomType} setRoomType={setRoomType} />
              <ParticipantLimit
                participantLimit={participantLimit}
                setParticipantLimit={setParticipantLimit}
                isLimitActive={isLimitActive}
                setLimitActive={setLimitActive}
              />
              <RoomDuration
                roomType={roomType}
                updateTimeLimit={updateTimeLimit}
                hrs={hrs}
                mins={mins}
              />
              <RoomInviteLink />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 pl-12 grow-0">
            <h1 className="text-xl font-bold mb-12">Join Room</h1>
            <input
              className="ring-2 ring-inset ring-accent1 bg-secondary p-3 focus:outline-none rounded-lg mb-3"
              type="text"
              placeholder="Invite Code"
            />
            <button className="w-full p-3 bg-accent1 text-xl font-bold rounded-lg">
              START
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-x-3 grow overflow-y-hidden">
          <div className="flex flex-row gap-x-3">
            <div className="relative flex flex-row">
              <input
                type="text"
                className="bg-secondary pl-3 pr-8 py-2 focus:outline-none focus:ring-2 ring-inset ring-accent1 rounded-lg"
                placeholder="Search problems"
              />
              <FaSearch className="absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
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
            <p className="ml-auto text-lg text-green font-bold">
              {selected
                ? `${selected}/4 problems selected`
                : "Select upto 4 problems"}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="relative grow flex flex-row py-3 gap-3 flex-wrap max-w-[723px] h-fit">
              {activeDifficulty}
              {activeStatus}
              {activeTags}
            </div>
            {activeDifficulty.length === 0 &&
            activeStatus.length === 0 &&
            activeTags.length === 0 ? (
              ""
            ) : (
              <button
                className="self-start ml-auto flex flex-row items-center p-3 gap-x-3 text-grey1"
                onClick={resetFilters}
              >
                <FaUndo />
                Reset
              </button>
            )}
          </div>
          <div className="grow overflow-y-scroll mb-3">
            <ProblemList type="select" />
          </div>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
