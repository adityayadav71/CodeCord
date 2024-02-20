import { useEffect, useState, useRef, useContext, createContext } from "react";
import { createRoom } from "../../api/roomsAPI";
import ProblemList from "../Problems/ProblemList";
import Pagination from "../Problems/Pagination";
import RoomTypeSelector from "./RoomTypeSelector";
import ParticipantLimit from "./ParticipantLimit";
import RoomDuration from "./RoomDuration";
import RoomInviteLink from "./RoomInviteLink";
import RoomVisibility from "./RoomVisibility";
import ProblemFilter from "../Problems/ProblemFilter";
import { AuthContext, loadData } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { getRoomData, joinRoom } from "../../api/roomsAPI";
import { toast } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

export const RoomFilterContext = createContext(null);

const CreateRoom = ({
  isContest,
  roomId,
  isClosing,
  closeRoomModal,
  setModalOpen,
}) => {
  // Declaring Contexts and Refs
  const inviteRef = useRef(null);
  const { userData, socket } = useContext(AuthContext);
  const { setRoomData } = useContext(RoomContext);
  // Declaring States
  const [isUserJoining, setIsUserJoining] = useState(false);
  const [isLimitActive, setLimitActive] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(10);
  const [roomType, setRoomType] = useState(isContest ? "Contest" : "Default");
  const [visibility, setVisibility] = useState("private");
  const [timeLimit, setTimeLimit] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [hrs, sethrs] = useState("");
  const [mins, setmins] = useState("10 mins");
  const [selected, setSelected] = useState([]);
  const [unselected, setUnSelected] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filterObj, setFilterObj] = useState({
    tags: [],
    page: 1,
    limit: 20,
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
      if (userData?.activeRoom) {
        toast.error(
          "You are already in a room. Leave before joining another one."
        );
      } else {
        // 1. Find Room In Database
        const { roomData } = await joinRoom(userData, socket, roomId);
        setRoomData(roomData);
        setModalOpen(null);

        // 2 Save newly joined room in RoomContext
        const room = await getRoomData(roomId);
        setRoomData(room);
        await loadData(); // update user data

        // 3. Navigate user to new room
        window.open(`/app/room/${roomId}`, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleCreateRoom = async () => {
    try {
      if (selected.length === 0) {
        toast.error("Please select problems before creating a room.");
      } else {
        const settings = {
          visibility,
          roomType,
          participantsLimit: participantLimit,
          timeLimit: roomType === "Default" ? 40 : timeLimit,
          problems: selected,
          difficulty,
        };

        // 1. Create Room with these settings
        const room = await createRoom(socket, roomId, settings);

        setRoomData(room);
        await loadData(); // update user data

        setModalOpen(null);
        toast.success("Successfully created a room.", {
          duration: 2000,
        });

        window.open(`/app/room/${roomId}`, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
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
    <div
      className={`modal fixed z-[9999] h-[95%] lg:w-[65%] w-[95%] ${
        isClosing ? "animate-closeModal" : "animate-openModal"
      } hideScrollbar overflow-x-hidden overflow-y-scroll shadow shadow-modal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightPrimary flex flex-col gap-y-3 rounded-lg p-6`}
    >
      <div className="flex sm:flex-row flex-col gap-3 mb-3">
        <div className="flex flex-col gap-y-3 sm:pr-12 sm:pb-0 pb-4 grow sm:border-r sm:border-r-accent2 sm:border-b-0 border-b border-b-accent2">
          <div className="flex flex-row sm:items-start items-center gap-x-3 mb-3">
            <h1 className="text-2xl font-bold">Create Room</h1>
            <RoomVisibility
              visibility={visibility}
              setVisibility={setVisibility}
            />
            <IoClose
              className="sm:hidden modal-close-btn ml-auto text-5xl p-3 rounded-lg border border-grey3"
              onClick={closeRoomModal}
            />
          </div>
          <div className="grid grid-cols-4 sm:grid-rows-2 grid-rows-3 gap-5">
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
            <RoomInviteLink inviteLink={roomId} />
          </div>
        </div>
        <div className="flex flex-col gap-y-3 sm:pl-12 grow-0">
          <h1 className="text-xl font-bold sm:mb-12">Join Room</h1>
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
              className="w-full p-3 bg-easyGreen hover:bg-greenBackGround duration-300 text-xl font-bold rounded-lg"
            >
              JOIN
            </button>
          ) : (
            <button
              onClick={handleCreateRoom}
              className="w-full p-3 bg-easyGreen hover:bg-greenBackGround duration-300 text-xl font-bold rounded-lg"
            >
              CREATE
            </button>
          )}
        </div>
      </div>
      <RoomFilterContext.Provider value={{ filterObj, setFilterObj }}>
        <div className="flex flex-col gap-x-3 grow sm:overflow-hidden z-10">
          <p className="text-base mb-3 text-green-500 font-bold">
            {selected.length !== 0
              ? `${selected.length}/4 problems selected`
              : "Select upto 4 problems"}
          </p>
          <ProblemFilter
            selected={selected}
            setSelected={setSelected}
            setUnSelected={setUnSelected}
            setDifficulty={setDifficulty}
            filterInsideModal={true}
          />
          <div className="flex grow overflow-y-hidden hideScrollbar rounded-xl mb-3">
            <ProblemList
              setTotalPages={setTotalPages}
              selected={selected}
              setSelected={setSelected}
              unselected={unselected}
              setUnSelected={setUnSelected}
              filterInsideModal={true}
            />
          </div>
          <Pagination totalPages={totalPages} filterInsideModal={true} />
        </div>
      </RoomFilterContext.Provider>
    </div>
  );
};
export default CreateRoom;
