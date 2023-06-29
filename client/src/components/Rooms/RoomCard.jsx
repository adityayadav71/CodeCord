import {
  FaHourglassHalf,
  FaHourglassStart,
  FaInfoCircle,
} from "react-icons/fa";
import { getRoomData, joinRoom } from "../../api/roomsAPI";
import { loadData } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const RoomCard = ({
  name,
  id,
  roomType,
  difficulty,
  started,
  remainingTimeInSeconds,
  participants,
  participantLimit,
}) => {
  const navigate = useNavigate();
  const formatDuration = (seconds) =>
    `${Math.floor(seconds / 3600) ? `${Math.floor(seconds / 3600)} h` : ""} ${
      Math.floor((seconds % 3600) / 60)
        ? `${Math.floor((seconds % 3600) / 60)} m`
        : ""
    } ${Math.floor(seconds % 60) ? `${Math.floor(seconds % 60)} s` : "0 s"}`;
  const { userData } = useContext(AuthContext);
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
        toast.error(
          "You are already in a room. Leave before joining another one."
        );
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
    <div className="grid grid-cols-4 grid-rows-3 p-3 bg-accent2 rounded-xl w-full leading-tight last:mb-24">
      <div className="col-span-2 row-span-2">
        <h2 className="text-lg leading-6 font-bold mb-2">{name}</h2>
        <span
          className={`px-2 py-1 uppercase font-semibold rounded-lg ${
            roomType === "Contest"
              ? "bg-green-300 text-green-800"
              : "bg-sky-200 text-accent1"
          }  mr-3`}
        >
          {roomType}
        </span>
        <span
          className={`px-2 py-1 rounded-lg uppercase font-semibold ${
            difficulty === "Easy"
              ? "bg-green-300 text-green-800"
              : difficulty === "Medium"
              ? "bg-yellow-300 text-yellow-800"
              : "bg-red-300 text-red-800"
          }`}
        >
          {difficulty}
        </span>
      </div>
      <p className="col-span-2 row-span-2 justify-self-end">
        {participants}/{participantLimit} joined
      </p>
      <div className="text-sm col-span-3 flex self-end items-center gap-3">
        <p className="flex items-center gap-2">
          {started ? (
            <FaHourglassHalf className="inline" />
          ) : (
            <FaHourglassStart className="inline" />
          )}
          {formatDuration(remainingTime)} left
        </p>
        <p className="flex items-center gap-2">
          <FaInfoCircle
            className={`inline ${
              remainingTime > 0
                ? started
                  ? "text-green-500"
                  : "text-yellow-500"
                : "text-red-500"
            }`}
          />
          {remainingTime > 0 ? (started ? "Live" : "Yet to start") : "Ended"}
        </p>
      </div>
      <button
        onClick={() => handleJoinRoom(id)}
        className="bg-accent1 hover:bg-lightAccent1 transition-all duration-300 p-1 w-20 rounded-lg text-lg text-white font-bold"
      >
        JOIN
      </button>
    </div>
  );
};

export default RoomCard;
