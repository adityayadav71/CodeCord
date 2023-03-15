import { useEffect, useState, useRef, useContext } from "react";
import ProblemList from "../Problems/ProblemList";
import Pagination from "../Problems/Pagination";
import RoomTypeSelector from "./RoomTypeSelector";
import ParticipantLimit from "./ParticipantLimit";
import RoomDuration from "./RoomDuration";
import RoomInviteLink from "./RoomInviteLink";
import RoomVisibility from "./RoomVisibility";
import ProblemFilter from "../Problems/ProblemFilter";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ isContest }) => {
  const inviteRef = useRef(null);
  const { userData } = useContext(AuthContext);
  const { connection } = useContext(RoomContext);
  const navigate = useNavigate();

  const updateTimeLimit = () => {
    const slider = document.getElementById("slider");
    const timeLimit = slider.value;
    const percent = (timeLimit * 100) / 120;
    slider.style.background = `linear-gradient(90deg, ${"rgb(44 187 93)" + percent + "%"} , ${"rgb(41 77 53)" + percent + "%"})`;
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
  
  const [isLimitActive, setLimitActive] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(10);
  const [roomType, setRoomType] = useState(isContest ? "Contest" : "Default");
  const [visibility, setVisibility] = useState("private");
  const [timeLimit, setTimeLimit] = useState(10);
  const [hrs, sethrs] = useState("");
  const [mins, setmins] = useState("10 mins");

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  const joinRoom = () => {
    const inviteCode = inviteRef.current.value;
    if (inviteCode !== "") {
      connection?.emit("join-room", inviteCode, userData?.username, () => {
        navigate(`/app/room/${inviteCode}`, { replace: false });
      });
    } else {
      connection?.emit("create-room", (inviteCode) => {
        navigate(`/app/room/${inviteCode}`, { replace: false });
      })
    }
  };

  return (
    <div>
      <div className="absolute top-0 left-0 h-full w-full z-[9998]"></div>
      <div className="modal fixed z-[9999] h-[95%] w-[60%] overflow-y-hidden shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightPrimary flex flex-col gap-y-3 rounded-lg p-6">
        <div className="flex flex-row gap-x-3 mb-3">
          <div className="flex flex-col gap-y-3 pr-12 grow border-r border-r-accent2">
            <div className="flex flex-row gap-x-3 mb-3">
              <h1 className="text-xl font-bold">Create Room</h1>
              <RoomVisibility visibility={visibility} setVisibility={setVisibility} />
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-5">
              <RoomTypeSelector roomType={roomType} setRoomType={setRoomType} />
              <ParticipantLimit participantLimit={participantLimit} setParticipantLimit={setParticipantLimit} isLimitActive={isLimitActive} setLimitActive={setLimitActive} />
              <RoomDuration roomType={roomType} updateTimeLimit={updateTimeLimit} hrs={hrs} mins={mins} />
              <RoomInviteLink />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 pl-12 grow-0">
            <h1 className="text-xl font-bold mb-12">Join Room</h1>
            <input ref={inviteRef} className="ring-2 ring-inset ring-accent1 bg-secondary p-3 focus:outline-none rounded-lg mb-3" type="text" placeholder="Invite Code" />
            <button onClick={joinRoom} className="w-full p-3 bg-accent1 text-xl font-bold rounded-lg">
              START
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-x-3 grow overflow-y-hidden">
          <ProblemFilter filterInsideModal={true} />
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
