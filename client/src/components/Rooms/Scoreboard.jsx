import { useState, useContext, useEffect, Fragment } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { RoomContext } from "../../layouts/AppLayout";
import { getProblem } from "../../api/problemDataAPI";
import Skeleton from "../skeletons/ScoreboardSkeleton";
import { FaUserAlt } from "react-icons/fa";

const Scoreboard = ({ isClosing, setIsClosing, setOpenScoreboard }) => {
  const { roomData } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const response = await getProblem(roomData?.settings?.problems);
      setProblems(response.problems);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenScoreboard(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div
      className={`scoreboard absolute z-[9999] h-[95%] w-[80%] ${
        isClosing ? "animate-closeModal" : "animate-openModal"
      } shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl bg-secondary rounded-xl`}
    >
      <div className="flex items-center justify-between mb-6 px-6 py-4 border-b border-accent2">
        <h1 className="text-2xl font-bold">Scoreboard</h1>
        <HiMiniXMark className="text-3xl font-bold hover:cursor-pointer" onClick={closeModal} />
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid auto-rows-auto grid-cols-12 gap-3 p-3 items-center justify-items-center">
          <p className="text-lg font-semibold">Rank</p>
          <p className="col-span-2 text-lg font-semibold justify-self-start">Username</p>
          {problems.map((problem, i) => {
            return (
              <div key={i} className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
                <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">{i + 1}</p>
                <p className="text-ellipsis overflow-hidden whitespace-nowrap">{problem.title}</p>
              </div>
            );
          })}
          <p className="text-lg font-semibold">Score</p>
          {roomData?.participants.map((participant, i) => (
            <Fragment key={i}>
              <p className={`${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : i === 2 ? "bg-amber-800" : "border border-white"} w-8 h-8 rounded-lg text-center`}>{i + 1}</p>
              <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
                {participant?.avatar ? (
                  <img
                    className="w-8 h-8 rounded-full drop-shadow-lg overflow-hidden"
                    src={`data:${participant?.avatar?.contentType};base64,${participant?.avatar?.image}`}
                    alt="user-profile-picture"
                  />
                ) : (
                  <div className="flex items-center justify-center rounded-full bg-grey2 w-8 h-8 text-xl">
                    <FaUserAlt className="text-lg hover:cursor-pointer" />
                  </div>
                )}
                <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">{participant?.username}</p>
              </div>
              <p className="col-span-2 text-lg text-center">-</p>
              <p className="col-span-2 text-lg text-center">-</p>
              <p className="col-span-2 text-lg text-center">-</p>
              <p className="col-span-2 text-lg text-center">-</p>
              <p className="text-xl text-center font-bold">0</p>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Scoreboard;
