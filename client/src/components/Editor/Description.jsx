import { useContext, useState } from "react";
import {
  AiFillLike,
  AiFillDislike,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaUserFriends as UserIcon } from "react-icons/fa";
import {
  HiChevronLeft as LeftIcon,
  HiChevronRight as RightIcon,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RoomContext } from "../../layouts/AppLayout";
import { ProblemContext } from "./index";
import he from "he";
import formatStats from "../../utilities/formatStats";
import User from "../Rooms/User";

const Description = ({ isRoom, handleProblemChange }) => {
  const { activeProblem } = useContext(ProblemContext);
  const { roomData } = useContext(RoomContext);

  const [activeTab, setActiveTab] = useState("Description");
  const [showParticipant, setShowParticipant] = useState(false);

  return (
    <div className="p-3">
      {(roomData?.hasStarted && !showParticipant) || !isRoom ? (
        <div className="flex flex-col h-full">
          {!isRoom && (
            <nav className="flex items-center justify-between px-3 py-3 border-b border-lightAccent3">
              <button
                className={`grow px-6 py-2 ${
                  activeTab === "Description"
                    ? "bg-lightSecondary text-white"
                    : ""
                } text-grey2 hover:text-white rounded-lg`}
                onClick={() => setActiveTab("Description")}
              >
                Description
              </button>
              <button
                className={`grow px-6 py-2 ${
                  activeTab === "Submissions"
                    ? "bg-lightSecondary text-white"
                    : ""
                } text-grey2 hover:text-white rounded-lg`}
                onClick={() => setActiveTab("Submissions")}
              >
                Submissions
              </button>
              <button
                className={`grow px-6 py-2 ${
                  activeTab === "Solutions"
                    ? "bg-lightSecondary text-white"
                    : ""
                } text-grey2 hover:text-white rounded-lg`}
                onClick={() => setActiveTab("Solutions")}
              >
                Solutions
              </button>
            </nav>
          )}
          <div className="overflow-y-scroll px-3 pt-6">
            <div className="flex flex-row justify-between items-center mb-3">
              <div>
                <h1 className="text-2xl">
                  {activeProblem?.number}. {activeProblem?.title}
                </h1>
                <p className="text-grey1">Question 1 of 4 </p>
              </div>
              {isRoom && (
                <div className="flex items-center gap-x-3">
                  <button
                    className="switch p-2 text-2xl rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300"
                    data-position="prev"
                    onClick={() => {
                      setShowParticipant((prevState) => !prevState);
                    }}
                  >
                    <UserIcon />
                  </button>
                  <button
                    className="switch p-2 text-2xl rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300"
                    data-position="prev"
                    onClick={handleProblemChange}
                  >
                    <LeftIcon />
                  </button>
                  <button
                    className="switch p-2 text-2xl rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300"
                    data-position="next"
                    onClick={handleProblemChange}
                  >
                    <RightIcon />
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-row items-center gap-x-5 mb-6">
              <div
                className={`px-3 ${
                  activeProblem?.difficulty === "easy"
                    ? "bg-greenBackGround text-easyGreen"
                    : activeProblem?.difficulty === "medium"
                    ? "bg-tagYellowBg text-mediumYellow"
                    : "bg-redBackGround text-hardRed"
                }  font-bold rounded-full`}
              >
                {activeProblem?.difficulty?.charAt(0).toUpperCase() +
                  activeProblem?.difficulty?.slice(1)}
              </div>
              <div className="flex flex-row gap-x-1 items-center">
                <AiOutlineLike className="text-xl" />
                <p className="text-grey1 font-bold">
                  {formatStats(activeProblem?.stats?.likes) || 0}
                </p>
              </div>
              <div className="flex flex-row gap-x-1 items-center">
                <AiOutlineDislike className="text-xl" />
                <p className="text-grey1 font-bold">
                  {formatStats(activeProblem?.stats?.dislikes) || 0}
                </p>
              </div>
            </div>
            <div className="mb-6">
              {activeProblem?.statement && he.decode(activeProblem?.statement)}
            </div>
            {activeProblem?.example?.map((example, i) => (
              <code className="mb-6" key={i}>
                <h1 className="mb-4 font-bold">Example {i + 1}:</h1>
                <div className="mb-4 px-3 py-2 rounded-lg bg-lightAccent3">
                  <span className="font-bold">Input:</span> {example.input}{" "}
                  <br />
                  <span className="font-bold">Output:</span> {example.output}{" "}
                  <br />
                  {example?.explanation && (
                    <>
                      <span className="font-bold">Explanation:</span>
                      {example?.explanation}
                    </>
                  )}
                </div>
              </code>
            ))}
            <div className="mb-6">
              <h1 className="mb-3 font-bold">Constraints:</h1>
              <div className="px-3 py-2">
                <ul className="list-disc list-inside">
                  {activeProblem?.constraints?.map((constraint, i) => (
                    <li key={i}>{he.decode(constraint)}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-x-5 mt-12 mb-12">
              <div className="flex flex-row items-center gap-x-3">
                <p className="text-grey1 text-base">Accepted</p>
                <p className="text-xl font-bold">
                  {formatStats(activeProblem?.stats?.accepted) || 0}
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-3">
                <p className="text-grey1 text-base">Submissions</p>
                <p className="text-xl font-bold">
                  {formatStats(activeProblem?.stats?.submissions) || 0}
                </p>
              </div>
              <div className="flex flex-row items-center gap-x-3">
                <p className="text-grey1 text-base">Acceptance</p>
                <p className="text-xl font-bold">
                  {activeProblem?.stats?.acceptance || 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-3 py-6 rounded-xl grow">
          <div className="flex flex-row items-center">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">
                {roomData?.ownerUsername}'s Room
              </h1>
              <p className="text-base text-grey1 mb-3">
                {roomData?.participants?.length || 0} participants
              </p>
            </div>
            {roomData?.hasStarted ? (
              <button
                className="switch p-2 text-2xl ml-auto rounded-lg bg-grey3 hover:bg-accent1 transition-all duration-300"
                data-position="prev"
                onClick={() => {
                  setShowParticipant((prevState) => !prevState);
                }}
              >
                <IoClose />
              </button>
            ) : (
              <p className="ml-auto mb-auto text-grey1">Waiting for the host to start the room...</p>
            )}
          </div>
          {roomData?.participants?.map((participant, i) => (
            <User
              key={i}
              userId={participant.userId}
              username={participant.username}
              imageURL={participant.avatar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Description;
