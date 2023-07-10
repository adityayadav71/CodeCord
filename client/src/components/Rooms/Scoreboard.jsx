import { useState, useContext, useEffect, Fragment } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { RoomContext } from "../../layouts/AppLayout";
import { getProblem } from "../../api/problemDataAPI";

const Scoreboard = ({ setOpenScoreboard }) => {
  const { roomData } = useContext(RoomContext);
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const response = await getProblem(roomData.settings.problems);
      setProblems(response.problems);
      setIsLoading(false);
    };
    loadData();
  }, []);
  return (
    <div className="absolute z-[9999] h-[95%] w-[80%] p-12 shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Scoreboard</h1>
        <FaRegTimesCircle className="text-2xl font-bold hover:cursor-pointer" onClick={() => setOpenScoreboard(false)} />
      </div>
      <div className="grid auto-rows-auto grid-cols-12 gap-3 items-center justify-items-center">
        <p>Rank</p>
        <p className="col-span-2 justify-self-start">Username</p>
        {problems.map((problem, i) => {
          return (
            <div key={i} className="flex flex-row gap-3 col-span-2 justify-center items-center w-full">
              <p className="text-center w-8 h-8 shrink-0 rounded-lg border border-white bg-secondary">{i + 1}</p>
              <p className="text-ellipsis overflow-hidden whitespace-nowrap">{problem.title}</p>
            </div>
          );
        })}
        <p>Score</p>
        {roomData?.participants.map((participant, i) => (
          <Fragment key={i}>
            <p className={`${i === 0 ? "bg-green-500" : i === 1 ? "bg-yellow-500" : i === 2 ? "bg-amber-800" : "border border-white"} w-8 h-8 rounded-lg text-center`}>{i + 1}</p>
            <div className="col-span-2 flex items-center gap-3 justify-self-start w-full">
              <img className="w-8 h-8 rounded-full drop-shadow-lg overflow-hidden" src={`data:${participant?.avatar?.contentType};base64,${participant?.avatar?.image}`} alt="user-profile-picture" />
              <p className="text-ellipsis overflow-hidden whitespace-nowrap text-center">{participant?.username}</p>
            </div>
            <p className="col-span-2 text-lg text-center">03:45</p>
            <p className="col-span-2 text-lg text-center">03:45</p>
            <p className="col-span-2 text-lg text-center">03:45</p>
            <p className="col-span-2 text-lg text-center">03:45</p>
            <p className="text-xl text-center font-bold">100</p>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
