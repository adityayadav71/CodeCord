import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import Problem from "./Problem";
import { getAllProblems } from "../../api/problemDataAPI";
import formatStats from "../../utilities/formatStats";
import { FilterContext } from "./index";
import { RoomFilterContext } from "../Rooms/CreateRoom";
import { FaSort, FaCaretDown, FaCaretUp } from "react-icons/fa";
import Skeleton from "../skeletons/Skeleton";

const ProblemList = ({ selected, setSelected, filterInsideModal }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { filterObj } = useContext(
    filterInsideModal ? RoomFilterContext : FilterContext
  );
  const [problems, setProblems] = useState([]);
  const [order, setOrder] = useState({
    number: "default",
    submissions: "default",
    acceptance: "default",
    difficulty: "default",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load All Problems when ProblemList component mounts
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getAllProblems(filterObj);
      const problems = data.problems;
      console.log(problems)
      setProblems(problems);
      setIsLoading(false);
    };
    loadData();
  }, [filterObj]);

  // Function to check if the problem has all the selected topic filter tags
  const matchTags = (selectedTags, problemTags) => {
    if (selectedTags.length === 0) return true;
    for (const tag of selectedTags) return problemTags.includes(tag);
    return false;
  };

  const handleHeaderClick = async (e) => {
    const sortField = e.target.closest(".header").dataset.header;

    // 1. Determine current sortOrder of the selected sortField
    let sortOrder =
      order[sortField] === "default"
        ? "desc"
        : order[sortField] === "desc"
        ? "asc"
        : "default";

    // 2. Update sortOrder state accordingly
    setOrder((prevOrder) => {
      return { ...prevOrder, [sortField]: sortOrder };
    });

    // 3. Declare appropriate sortFunctions for different problem fields
    const sortFunctions = {
      number: (a, b) => {
        return sortOrder === "asc" ? a.number - b.number : b.number - a.number;
      },
      acceptance: (a, b) => {
        return sortOrder === "asc"
          ? a.stats.acceptance - b.stats.acceptance
          : b.stats.acceptance - a.stats.acceptance;
      },
      submissions: (a, b) => {
        return sortOrder === "asc"
          ? a.stats.submissions - b.stats.submissions
          : b.stats.submissions - a.stats.submissions;
      },
      difficulty: (a, b) => {
        const difficultyOrder = {
          easy: 0,
          medium: 1,
          hard: 2,
        };
        const aDifficulty = difficultyOrder[a.difficulty];
        const bDifficulty = difficultyOrder[b.difficulty];
        return sortOrder === "asc"
          ? aDifficulty - bDifficulty
          : bDifficulty - aDifficulty;
      },
    };

    // 4. Update problems by sorting them using the sortFunctions object, sortField and sortOrder
    setProblems((prevProblems) => {
      let sortedProblems;
      if (sortOrder !== "default") {
        sortedProblems = [...prevProblems].sort(sortFunctions[sortField]);
        return sortedProblems;
      }
      // Default: Sorted by number in ascending order
      return [...prevProblems].sort((a, b) => a.number - b.number);
    });
  };

  return (
    <div className="flex flex-col bg-secondary rounded-xl mb-3 grow">
      <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
        <p className="w-20">Status</p>
        <div
          className="header group flex flex-row grow items-center justify-between hover:cursor-pointer"
          data-header="number"
          onClick={handleHeaderClick}
        >
          <p>Title</p>
          <div className="flex flex-col items-center justify-center mr-2">
            <FaSort
              className={`text-grey1 group-hover:text-white ${
                order.number === "default" ? "block" : "hidden"
              }`}
            />
            <FaCaretUp
              className={`text-sm text-grey1 group-hover:text-white ${
                order.number === "asc" ? "block" : "hidden"
              }`}
            />
            <FaCaretDown
              className={`text-sm text-grey1 group-hover:text-white ${
                order.number === "desc" ? "block" : "hidden"
              }`}
            />
          </div>
        </div>
        <div
          className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer"
          data-header="acceptance"
          onClick={handleHeaderClick}
        >
          <p>Acceptance</p>
          <div className="flex flex-col items-center justify-center mr-2">
            <FaSort
              className={`text-grey1 group-hover:text-white ${
                order.acceptance === "default" ? "block" : "hidden"
              }`}
            />
            <FaCaretUp
              className={`text-sm text-grey1 group-hover:text-white ${
                order.acceptance === "asc" ? "block" : "hidden"
              }`}
            />
            <FaCaretDown
              className={`text-sm text-grey1 group-hover:text-white ${
                order.acceptance === "desc" ? "block" : "hidden"
              }`}
            />
          </div>
        </div>
        <div
          className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer"
          data-header="difficulty"
          onClick={handleHeaderClick}
        >
          <p>Difficulty</p>
          <div className="flex flex-col items-center justify-center mr-2">
            <FaSort
              className={`text-grey1 group-hover:text-white ${
                order.difficulty === "default" ? "block" : "hidden"
              }`}
            />
            <FaCaretUp
              className={`text-sm text-grey1 group-hover:text-white ${
                order.difficulty === "asc" ? "block" : "hidden"
              } block`}
            />
            <FaCaretDown
              className={`text-sm text-grey1 group-hover:text-white ${
                order.difficulty === "desc" ? "block" : "hidden"
              } block`}
            />
          </div>
        </div>
        <div
          className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer"
          data-header="submissions"
          onClick={handleHeaderClick}
        >
          <p>Submissions</p>
          <div className="flex flex-col items-center justify-center mr-2">
            <FaSort
              className={`text-grey1 group-hover:text-white ${
                order.submissions === "default" ? "block" : "hidden"
              }`}
            />
            <FaCaretUp
              className={`text-sm text-grey1 group-hover:text-white ${
                order.submissions === "asc" ? "block" : "hidden"
              }`}
            />
            <FaCaretDown
              className={`text-sm text-grey1 group-hover:text-white ${
                order.submissions === "desc" ? "block" : "hidden"
              }`}
            />
          </div>
        </div>
        {isLoggedIn && !filterInsideModal && (
          <div className="w-40">Your Submissions</div>
        )}
        {filterInsideModal && <div className="w-20">Selected</div>}
      </div>
      {isLoading ? (
        <Skeleton classes="grow" />
      ) : (
        problems
          .filter((problem) => {
            // Add the problem if the filterObj values are initial else match tags and difficulty
            if (filterObj.tags.length !== 0 || filterObj.difficulty !== "") {
              // Case when filter difficulty is empty and tags is not
              const matchDifficulty =
                filterObj.difficulty === ""
                  ? true
                  : filterObj.difficulty === problem.difficulty;
              return matchTags(filterObj.tags, problem.tags) && matchDifficulty;
            } else return true;
          })
          .slice(
            (filterObj.page - 1) * filterObj.limit,
            (filterObj.page - 1) * filterObj.limit + filterObj.limit
          )
          .map((problem, i) => (
            <Problem
              key={i}
              selected={selected}
              setSelected={setSelected}
              number={problem.number}
              filterInsideModal={filterInsideModal}
              name={problem.title}
              acceptance={problem?.stats?.acceptance || 0}
              difficulty={problem.difficulty}
              userSubmissions="1"
              submissions={formatStats(problem?.stats?.submissions) || 0}
              status="solved"
            />
          ))
      )}
    </div>
  );
};

export default ProblemList;
