import { FaHourglassHalf, FaHourglassStart, FaInfoCircle } from "react-icons/fa";
import { getRoomData, joinRoom } from "../../api/roomsAPI";
import { loadData } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const RoomCard = ({ name, id, roomType, difficulty, started, remainingTimeInSeconds, participants, participantLimit }) => {
  const navigate = useNavigate();
  const formatDuration = (seconds) =>
    `${Math.floor(seconds / 3600) ? `${Math.floor(seconds / 3600)} h` : ""} ${Math.floor((seconds % 3600) / 60) ? `${Math.floor((seconds % 3600) / 60)} m` : ""} ${
      Math.floor(seconds % 60) ? `${Math.floor(seconds % 60)} s` : "0 s"
    }`;
  const { userData, isLoggedIn } = useContext(AuthContext);
  const { socket, setRoomData } = useContext(RoomContext);
  const [remainingTime, setRemainingTime] = useState(remainingTimeInSeconds);

  useEffect(() => {
    if (remainingTime && started) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000); // Update every second

      return () => {
        clearInterval(interval);
      };
    }
  }, [remainingTime, started]);

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
        navigate(`/app/room/${roomId}`, { replace: false });
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-x-2 p-3 bg-accent2 border border-[#8496A3] rounded-xl w-full leading-tight last:mb-24">
      <div className="col-span-3 row-span-2">
        <h2 className="sm:text-lg text-xl leading-6 truncate font-bold sm:mb-2 mb-3">{name}</h2>
        <span className={`px-2 py-1 uppercase font-semibold rounded-lg ${roomType === "Contest" ? "bg-green-300 text-green-800" : "bg-sky-200 text-accent1"}  mr-3`}>{roomType}</span>
        <span
          className={`px-2 py-1 rounded-lg uppercase font-semibold ${
            difficulty === "Easy" ? "bg-green-300 text-green-800" : difficulty === "Medium" ? "bg-yellow-300 text-yellow-800" : "bg-red-300 text-red-800"
          }`}
        >
          {difficulty}
        </span>
      </div>
      <p className="col-span-1 row-span-2 justify-self-end">
        {participants}/{participantLimit}
      </p>
      <div className="text-sm col-span-3 flex self-end items-center gap-3">
        <p className="flex items-center gap-2 sm:text-base text-lg truncate">
          {started ? <FaHourglassHalf className="inline" /> : <FaHourglassStart className="inline" />}
          {formatDuration(remainingTime)} left
        </p>
        <p className="flex items-center gap-2 sm:text-base text-lg">
          <FaInfoCircle className={`inline ${remainingTime > 0 ? (started ? "text-green-500" : "text-yellow-500") : "text-red-500"}`} />
          {remainingTime > 0 ? (started ? "Live" : "Yet to start") : "Ended"}
        </p>
      </div>
      <div className="relative">
        <button
          onClick={() => handleJoinRoom(id)}
          disabled={!isLoggedIn}
          className="peer bg-accent1 hover:bg-lightAccent1 disabled:cursor-not-allowed transition-all duration-300 sm:p-1 p-2 w-full rounded-lg sm:text-lg text-xl text-white font-bold"
        >
          JOIN
        </button>
        {!isLoggedIn && (
          <div className="absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-14 right-0 px-3 py-1 bg-white text-primary rounded-lg">
            Login to join this room
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
