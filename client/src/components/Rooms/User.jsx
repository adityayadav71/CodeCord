import { AuthContext } from "../../App";
import { RoomContext, populateParticipants } from "../../layouts/AppLayout";
import { useContext } from "react";
import { removeParticipant } from "../../api/roomsAPI";

const User = ({ userId, username, imageURL, country }) => {
  const { socket, userData } = useContext(AuthContext);
  const { roomData, setRoomData } = useContext(RoomContext);

  const handleRemoveParticipant = async () => {
    let room = await removeParticipant(
      username,
      userId,
      roomData?.roomId,
      socket
    );
    room = await populateParticipants(room, userData);

    setRoomData(room);
    localStorage.setItem("room", JSON.stringify(room));
  };

  console.log(roomData?.iAmHost, username, userData?.user?.username);

  return (
    <div className="p-4 flex flex-row justify-between bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
      <div className="flex flex-row gap-x-3">
        <img
          src={imageURL}
          className="w-14 h-14 rounded-full hover:cursor-pointer"
          alt="profile-pic"
        />
        <div>
          <h1 className="text-xl font-bold">{username}</h1>
          <p className="text-base text-grey1">{country} | user rating</p>
        </div>
      </div>

      {roomData?.iAmHost && username !== userData?.user?.username && (
        <button
          className="p-3 font-bold text-lg bg-accent1 transition-all duration-300 hover:bg-lightAccent1 text-white rounded-xl"
          onClick={handleRemoveParticipant}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default User;
