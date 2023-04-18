import { useState, useEffect } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaRegTimesCircle,
  FaUndo,
  FaMinus,
  FaCheck,
  FaRandom,
} from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";
import Difficulty from "./Difficulty";
import Status from "./Status";
import Tags from "./Tags";
import CreateRoom from "../Rooms/CreateRoom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import { FilterContext } from "./index";
import { RoomFilterContext } from "../Rooms/CreateRoom";
import { getRandomProblems } from "../../api/problemDataAPI";
import { createRoom } from "../../api/roomsAPI";
import { RoomContext } from "../../layouts/AppLayout";
import { nanoid } from "nanoid";

const ProblemFilter = ({ selected, setSelected, filterInsideModal }) => {
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
  const [activeDifficulty, setActiveDifficulty] = useState([]);
  const [activeStatus, setActiveStatus] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    difficulty: "",
    topics: [],
  });

  const { isLoggedIn, userData } = useContext(AuthContext);
  const { setSocket } = useContext(RoomContext);
  const { setFilterObj } = useContext(
    filterInsideModal ? RoomFilterContext : FilterContext
  );

  useEffect(() => {
    setFilterObj((prevObj) => {
      return {
        ...prevObj,
        tags: activeFilters.topics,
        difficulty: activeFilters.difficulty,
      };
    });
  }, [activeFilters]);

  const handleRandomize = async () => {
    const data = await getRandomProblems();
    data.problems = data.problems.map((problem) => problem.number);
    setSelected(data.problems);
  };

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
      setActiveFilters((prevFilter) => {
        return {
          ...prevFilter,
          difficulty: "",
        };
      });
    } else if (
      target.contains("to-do") ||
      target.contains("solved") ||
      target.contains("attempted")
    ) {
      setActiveStatus([]);
      setActiveFilters((prevFilter) => {
        return {
          ...prevFilter,
          status: "",
        };
      });
    }
  };

  const addTag = (event) => {
    const target = event.currentTarget.textContent;
    const isDifficulty = !!event.target.closest(".difficulty-dropdown");
    setActiveFilters((prevFilter) => {
      return {
        ...prevFilter,
        [isDifficulty ? "difficulty" : "status"]: target.toLowerCase(),
      };
    });
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
    isDifficulty ? setActiveDifficulty([tag]) : setActiveStatus([tag]);
  };

  const resetFilters = () => {
    setActiveFilters({
      difficulty: "",
      topics: [],
    });
    setActiveDifficulty(() => []);
    setActiveStatus(() => []);
    setActiveTags(() => []);
  };

  const [modal, setModal] = useState();
  const openRoomModal = async () => {
    const roomID = nanoid();
    // 1. Create Room in Database - Return RoomID
    const result = await createRoom(userData?.userId, roomID);
    if (result?.response?.data?.result)
      window.alert(result?.response?.data?.result);
    else {
      setSocket(result.socket);
      setModal(<CreateRoom isContest={true} roomId={result.id} />);
    }
  };

  useEffect(() => {
    const closeModal = (event) => {
      if (
        !event.target.closest(".modal") &&
        !event.target.classList.contains("open-modal")
      ) {
        setModal("");
      }
    };
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-x-3 mb-3">
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
          setActiveFilters={setActiveFilters}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
        <div
          className={`searchbar relative h-fit w-fit flex flex-row items-center`}
        >
          <FaSearch className="absolute left-2" />
          <input
            className="h-fit w-fit p-3 pl-8 focus:outline-none focus:bg-grey3 bg-secondary rounded-lg"
            type="text"
            placeholder="Search questions"
          />
        </div>
        {filterInsideModal ? (
          <>
            <button
              className="flex flex-row gap-x-3 items-center bg-accent1 px-3 rounded-lg"
              onClick={handleRandomize}
            >
              <FaRandom />
              Randomize
            </button>
            <div className="flex flex-col ml-auto items-end justify-center">
              <p className="ml-auto text-lg text-green font-bold">
                {selected.length !== 0
                  ? `${selected.length}/4 problems selected`
                  : "Select upto 4 problems"}
              </p>
              <div className="flex flex-row gap-x-3">
                {selected.map((problem, i) => (
                  <p key={i} className="text-white px-3 rounded-lg bg-accent1">
                    {problem}
                  </p>
                ))}
              </div>
            </div>
          </>
        ) : (
          isLoggedIn && (
            <button
              className="open-modal flex flex-row gap-x-3 items-center h-fit w-fit ml-auto p-3 text-accent1 hover:text-lightAccent1 rounded-lg"
              onClick={openRoomModal}
            >
              <FaCheckCircle className="text-xl" />
              Create Contest
            </button>
          )
        )}

        {modal}
      </div>
      <div className="modal flex flex-row">
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
    </div>
  );
};

export default ProblemFilter;
