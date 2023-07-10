import { FaRegClipboard } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { getPublicRooms } from "../../api/roomsAPI";
import { getRoomData, joinRoom } from "../../api/roomsAPI";
import { loadData } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { toast } from "react-hot-toast";
import { TbDoorOff } from "react-icons/tb";
import Skeleton from "../skeletons/ActiveRoomsSkeleton";

const ActiveRoom = ({ name, participants, participantsLimit, difficulty, remainingTimeInSeconds, startedAt, roomId, handleJoinRoom, handleCopyInviteLink }) => {
  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const hoursString = hours.toString().padStart(2, "0");
    const minutesString = minutes.toString().padStart(2, "0");
    const secondsString = seconds.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}:${secondsString}`;
  };

  const { isLoggedIn } = useContext(AuthContext);
  const [remainingTime, setRemainingTime] = useState(remainingTimeInSeconds);

  useEffect(() => {
    if (remainingTime && startedAt) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // Update every second

      return () => {
        clearInterval(interval);
      };
    }
  }, [remainingTime, startedAt]);

  return (
    <tr className="odd:bg-hover">
      <td className="px-3 py-1">{name}</td>
      <td className="px-3 py-1">
        {participants} / {participantsLimit}
      </td>
      <td className="px-3 py-1">{formatDuration(remainingTime)}</td>
      <td className="px-3 py-1">
        <p
          className={`px-3 w-fit ${
            difficulty === "Easy" ? "bg-greenBackGround text-easyGreen" : difficulty === "Medium" ? "bg-yellowBackGround text-mediumYellow" : "bg-redBackGround text-hardRed"
          } rounded-lg uppercase font-semibold`}
        >
          {difficulty}
        </p>
      </td>
      <td className="px-3 py-1">
        <p className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${remainingTime > 0 ? (startedAt ? "bg-green-500" : "bg-yellow-500") : "bg-red-500"}`}></span>
          <span>{remainingTime > 0 ? (startedAt ? "Live" : "Yet to start") : "Ended"}</span>
        </p>
      </td>
      <td className="px-3 py-1">
        <div className="relative">
          <button onClick={() => handleJoinRoom(roomId)} disabled={!isLoggedIn} className="peer px-6 py-3 border rounded-lg border-accent1 hover:bg-accent1 disabled:cursor-not-allowed">
            Join
          </button>
          {!isLoggedIn && (
            <div className="absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-16 px-3 py-1 bg-white text-primary rounded-lg">
              Login to join this room
            </div>
          )}
        </div>
      </td>
      <td>
        <FaRegClipboard onClick={() => handleCopyInviteLink(roomId)} className="text-xl hover:text-accent1 hover:cursor-pointer" />
      </td>
    </tr>
  );
};
const ActiveRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, userData, socket } = useContext(AuthContext);
  const { setRoomData } = useContext(RoomContext);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const rooms = await getPublicRooms();
      setRooms(rooms);
      setIsLoading(false);
    };
    loadData();
    socket?.on("live-rooms-update", () => loadData());
  }, [socket]);

  const handleJoinRoom = async (roomId) => {
    try {
      if (userData?.activeRoom) {
        toast.error("You are already in a room. Leave before joining another one.");
      } else {
        // 1. Find Room In Database
        const { roomData } = await joinRoom(userData, socket, roomId);
        setRoomData(roomData);

        // 2 Save newly joined room in RoomContext
        const room = await getRoomData(roomId);
        setRoomData(room);
        await loadData(); // update user data

        // 3. Navigate user to new room
        navigate(`/app/room/${roomId}`, { replace: true });
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };
  const handleCopyInviteLink = (roomId) => {
    navigator.clipboard.writeText(roomId);
    toast.success("Invite Code copied to clipboard!");
  };

  return isLoading ? (
    <Skeleton />
  ) : rooms && rooms.length > 0 ? (
    <div className="mx-48 mt-12 drop-shadow-xl">
      {!isLoggedIn && <div className="bg-yellowBackGround border border-mediumYellow text-md font-semibold px-3 py-1 mb-3 rounded-lg">Login to join rooms</div>}
      <div className="rounded-xl">
        <table className="w-full h-full text-lg">
          <thead className="bg-secondary">
            <tr>
              <td className="p-3">Room Name</td>
              <td className="p-3">Participants</td>
              <td className="p-3">Time Left</td>
              <td className="p-3">Difficulty</td>
              <td className="p-3">Status</td>
              <td className="p-3">Action</td>
              <td className="p-3">Invite Code</td>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room, i) => {
              const expiresAt = new Date(room.expiresAt).getTime() - Date.now();
              const remainingTime = room.startedAt ? (expiresAt > 0 ? expiresAt / 1000 : 0) : room.settings.timeLimit * 60;

              return (
                <ActiveRoom
                  key={i}
                  name={room.name}
                  participants={room.participants.length}
                  participantsLimit={room.settings.participantsLimit}
                  difficulty={room.settings.difficulty}
                  remainingTimeInSeconds={remainingTime}
                  startedAt={room.startedAt}
                  roomId={room.roomId}
                  handleJoinRoom={handleJoinRoom}
                  handleCopyInviteLink={handleCopyInviteLink}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-3 items-center justify-center h-full w-full">
      <TbDoorOff className="text-9xl text-grey1" />
      <p className="text-grey1 text-xl">No rooms found ☹️</p>
    </div>
  );
};

export default ActiveRooms;
