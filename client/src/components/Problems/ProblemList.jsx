import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import Problem from "./Problem";
import { getAllProblems } from "../../api/problemDataAPI";
import formatStats from "../../utilities/formatStats";
import { FilterContext } from "./index";

const ProblemList = ({ type }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { filterObj } = useContext(FilterContext);
  const [problemList, setProblemList] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const data = await getAllProblems(filterObj);
      const problems = data.problems;
      setProblemList(() =>
        problems.map((problem, i) => (
          <Problem
            key={i}
            number={problem.number}
            type={type}
            name={problem.title}
            acceptance={problem?.stats?.acceptance || 0}
            difficulty={problem.difficulty}
            userSubmissions="1"
            submissions={formatStats(problem?.stats?.submissions) || 0}
            status="solved"
          />
        ))
      );
    };
    loadData();
  }, [filterObj]);
  return (
    <div className="flex flex-col bg-secondary rounded-xl mb-3 grow overflow-clip">
      <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
        <div className="w-20">Status</div>
        <div className="grow">Title</div>
        <div className="w-40">Acceptance</div>
        <div className="w-40">Difficulty</div>
        <div className="w-40">Submissions</div>
        {isLoggedIn && type !== "select" && (
          <div className="w-40">Your Submissions</div>
        )}
        {type === "select" && <div className="w-20">Selected</div>}
      </div>
      {problemList}
    </div>
  );
};

export default ProblemList;
