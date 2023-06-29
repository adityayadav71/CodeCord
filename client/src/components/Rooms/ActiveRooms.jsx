import { FaRegClipboard } from "react-icons/fa";
import { useState, useEffect } from "react";
import { getPublicRooms } from "../../api/roomsAPI";
import { getRoomData, joinRoom } from "../../api/roomsAPI";
import { loadData } from "../../App";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useContext } from "react";
import { toast } from "react-hot-toast";

const ActiveRoom = ({
  name,
  participants,
  participantsLimit,
  difficulty,
  remainingTimeInSeconds,
  startedAt,
  roomId,
  handleJoinRoom,
  handleCopyInviteLink,
}) => {
  const formatDuration = (seconds) =>
    `${Math.floor(seconds / 3600) ? `${Math.floor(seconds / 3600)} hr` : ""} ${
      Math.floor((seconds % 3600) / 60)
        ? `${Math.floor((seconds % 3600) / 60)} min`
        : ""
    } ${
      Math.floor(seconds % 60) ? `${Math.floor(seconds % 60)} sec` : "0 sec"
    }`;

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
  }, []);

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
            difficulty === "Easy"
              ? "bg-greenBackGround text-easyGreen"
              : difficulty === "Medium"
              ? "bg-yellowBackGround text-mediumYellow"
              : "bg-redBackGround text-hardRed"
          } rounded-lg uppercase font-semibold`}
        >
          {difficulty}
        </p>
      </td>
      <td className="px-3 py-1">
        <p className="flex items-center">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              remainingTime > 0
                ? startedAt
                  ? "bg-green-500"
                  : "bg-yellow-500"
                : "bg-red-500"
            }`}
          ></span>
          <span>
            {remainingTime > 0
              ? startedAt
                ? "Live"
                : "Yet to start"
              : "Ended"}
          </span>
        </p>
      </td>
      <td className="px-3 py-1">
        <button
          onClick={() => handleJoinRoom(roomId)}
          className="px-6 py-3 border rounded-lg border-accent1 hover:bg-accent1"
        >
          Join
        </button>
      </td>
      <td>
        <FaRegClipboard
          onClick={handleCopyInviteLink}
          className="text-xl hover:text-accent1 hover:cursor-pointer"
        />
      </td>
    </tr>
  );
};
const ActiveRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const { userData } = useContext(AuthContext);
  const { socket, setRoomData } = useContext(RoomContext);

  useEffect(() => {
    const loadData = async () => {
      const rooms = await getPublicRooms();
      setRooms(rooms);
    };
    loadData();
  }, []);

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
        navigate(`/app/room/${roomId}`, { replace: true });
      }
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };
  const handleCopyInviteLink = () => {};

  return (
    <table className="mx-48 mt-12 text-lg">
      <thead>
        <tr>
          <td className="p-3">Room Name</td>
          <td className="p-3">Participants</td>
          <td className="p-3">Time Left</td>
          <td className="p-3">Difficulty</td>
          <td className="p-3">Status</td>
          <td className="p-3">Action</td>
          <td className="p-3">Invite Link</td>
        </tr>
      </thead>
      <tbody>
        {rooms ? (
          rooms?.map((room, i) => {
            const expiresAt = new Date(room.expiresAt).getTime() - Date.now();
            const remainingTime = room.startedAt
              ? expiresAt > 0
                ? expiresAt / 1000
                : 0
              : room.settings.timeLimit * 60;

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
          })
        ) : (
          <tr>
            <td className="text-grey1">No live rooms found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ActiveRooms;
