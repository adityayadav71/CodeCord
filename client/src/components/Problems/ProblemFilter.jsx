import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../App";
import { FilterContext } from "./index";
import { RoomFilterContext } from "../Rooms/CreateRoom";
import { getRandomProblems } from "../../api/problemDataAPI";
import { createRoom } from "../../api/roomsAPI";
import { nanoid } from "nanoid";
import { toast } from "react-hot-toast";

const ProblemFilter = ({ selected, setSelected, setDifficulty, filterInsideModal }) => {
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
    setDifficulty("Medium");
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
    try {
      const roomID = nanoid();
      // 1. Create Room in Database - Return RoomID
      const result = await createRoom(userData?.userId, roomID);
      setModal(<CreateRoom isContest={true} roomId={result.id} />);
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
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
            <div className="relative">
              <button
                className="peer h-full flex flex-row gap-x-3 items-center text-xl hover:bg-green-500 bg-greenBackGround px-6 rounded-lg"
                onClick={handleRandomize}
              >
                <FaRandom />
              </button>
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-16 px-3 py-1 bg-white text-primary rounded-lg">
                Select Random Problems
              </div>
            </div>
            <div className="relative">
              <button
                className="peer h-full flex flex-row gap-x-3 items-center text-xl hover:bg-mediumYellow bg-yellowBackGround px-6 rounded-lg"
                onClick={() => selected.length !== 0 && setSelected([])}
              >
                <FaUndo />
              </button>
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-16 px-3 py-1 bg-white text-primary rounded-lg">
                Unselect all problems
              </div>
            </div>

            <div className="flex flex-col ml-auto items-end justify-center">
              <p className="ml-auto text-base text-green-500 font-bold">
                {selected.length !== 0
                  ? `${selected.length}/4 problems selected`
                  : "Select upto 4 problems"}
              </p>
            </div>
          </>
        ) : (
          isLoggedIn && !userData?.activeRoom && (
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
