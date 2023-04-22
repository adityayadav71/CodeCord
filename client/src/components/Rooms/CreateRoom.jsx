import { useEffect, useState, useRef, useContext, createContext } from "react";
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
import { updateRoomSettings, getRoomData, joinRoom } from "../../api/roomsAPI";

export const RoomFilterContext = createContext(null);

const CreateRoom = ({ isContest, roomId, setModal }) => {
  // Declaring Contexts and Refs
  const inviteRef = useRef(null);
  const { userData, socket } = useContext(AuthContext);
  const { setRoomData } = useContext(RoomContext);
  const navigate = useNavigate();
  // Declaring States
  const [isUserJoining, setIsUserJoining] = useState(false);
  const [isLimitActive, setLimitActive] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(10);
  const [roomType, setRoomType] = useState(isContest ? "Contest" : "Default");
  const [visibility, setVisibility] = useState("private");
  const [timeLimit, setTimeLimit] = useState(10);
  const [inviteLink, setInviteLink] = useState(roomId);
  const [hrs, sethrs] = useState("");
  const [mins, setmins] = useState("10 mins");
  const [selected, setSelected] = useState([]);
  const [filterObj, setFilterObj] = useState({
    tags: [],
    page: 1,
    limit: 20,
    totalPages: 1,
    difficulty: "",
    sort: "",
  });

  // State Change/Event handler functions
  const updateTimeLimit = () => {
    const slider = document.getElementById("slider");
    const timeLimit = slider.value;
    const percent = (timeLimit * 100) / 120;
    slider.style.background = `linear-gradient(90deg, ${
      "rgb(44 187 93)" + percent + "%"
    } , ${"rgb(41 77 53)" + percent + "%"})`;
    setTimeLimit(timeLimit);
  };

  const handleJoinInviteChange = (e) => {
    e.target.value === ""
      ? setIsUserJoining(false)
      : !isUserJoining
      ? setIsUserJoining(true)
      : null;
  };

  const handleJoinRoom = async () => {
    const roomId = inviteRef.current.value;
    try {
      // 1. Find Room In Database
      const { roomData } = await joinRoom(userData, socket, roomId);
      setRoomData(roomData);
      setModal(null);

      // 2 Save newly joined room in RoomContext
      const room = await getRoomData(roomId);
      setRoomData(room);
      
      //3. Store roomData in localStorage
      localStorage.setItem("room", JSON.stringify(room));

      // 4. Navigate user to new room
      navigate(`app/room/${roomId}`, { replace: false });
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleUpdateRoom = async () => {
    try {
      const settings = {
        visibility,
        roomType,
        participantLimit,
        timeLimit: roomType === "Default" ? 40 : timeLimit,
        problems: selected,
      };
      // 1. Update Room with these settings
      const response = await updateRoomSettings(roomId, settings);

      // 2 Save newly joined room in RoomContext
      const room = await getRoomData(roomId);
      setRoomData(room);

      //3. Store roomData in localStorage
      localStorage.setItem("room", JSON.stringify(room));

      setModal(null);
      navigate(`/app/room/${roomId}?problems=${selected}`, { replace: false });
    } catch (err) {
      console.log(err);
      window.alert(err.message);
    }
  };

  // Utility functions for this component
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  // useEffect hook to initialize hrs and minutes from timeLimit
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
  }, [timeLimit]);

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
              <RoomInviteLink inviteLink={inviteLink} />
            </div>
          </div>
          <div className="flex flex-col gap-y-3 pl-12 grow-0">
            <h1 className="text-xl font-bold mb-12">Join Room</h1>
            <input
              ref={inviteRef}
              onChange={handleJoinInviteChange}
              className="ring-2 ring-inset ring-accent1 bg-secondary p-3 focus:outline-none rounded-lg mb-3"
              type="text"
              placeholder="Invite Code"
            />
            {isUserJoining ? (
              <button
                onClick={handleJoinRoom}
                className="w-full p-3 bg-accent1 text-xl font-bold rounded-lg"
              >
                JOIN
              </button>
            ) : (
              <button
                onClick={handleUpdateRoom}
                className="w-full p-3 bg-accent1 text-xl font-bold rounded-lg"
              >
                CREATE
              </button>
            )}
          </div>
        </div>
        <RoomFilterContext.Provider value={{ filterObj, setFilterObj }}>
          <div className="flex flex-col gap-x-3 grow overflow-y-hidden">
            <ProblemFilter
              selected={selected}
              setSelected={setSelected}
              filterInsideModal={true}
            />
            <div className="grow overflow-y-scroll mb-3">
              <ProblemList
                selected={selected}
                setSelected={setSelected}
                type="select"
              />
            </div>
            <Pagination type="select" />
          </div>
        </RoomFilterContext.Provider>
      </div>
    </div>
  );
};
export default CreateRoom;
