import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getAllProblems } from "../../api/problemDataAPI";
import Problem from "./Problem";
import { AuthContext } from "../../App";
import Skeleton from "../skeletons/ProblemListSkeleton";
import formatStats from "../../utilities/formatStats";

const ProblemTagList = (props) => {
  const params = useParams();
  const [problems, setProblems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await getAllProblems({ tags: [params.tagname] });
      setProblems(data.problems);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      <h1 className="text-4xl font-semibold ml-48 mt-12">{params.tagname}</h1>
      <div className="flex flex-col bg-secondary rounded-xl mx-48 mt-6">
        <div className="flex flex-row items-center p-3 text-md border-b-[1px] border-hover">
          <p className="w-20">Status</p>
          <div className="header group flex flex-row grow items-center justify-between hover:cursor-pointer">
            <p>Title</p>
          </div>
          <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
            <p>Acceptance</p>
          </div>
          <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
            <p>Difficulty</p>
          </div>
          <div className="header group flex flex-row items-center justify-between w-40 hover:cursor-pointer">
            <p>Submissions</p>
          </div>
          {isLoggedIn && <div className="w-40">Your Submissions</div>}
        </div>
        {problems?.length !== 0 ? (
          problems?.map((problem) => (
            <Problem
              key={problem.number}
              number={problem.number}
              name={problem.title}
              acceptance={problem?.stats?.acceptance || 0}
              difficulty={problem.difficulty}
              userSubmissions="1"
              submissions={formatStats(problem?.stats?.submissions) || 0}
              status={problem.status}
              filterInsideModal={false}
            />
          ))
        ) : (
          <div className="h-16 rounded-b-xl text-grey2 w-full bg-secondary p-3">No problems tagged {params.tagname} found.</div>
        )}
      </div>
    </>
  );
};

export default ProblemTagList;
