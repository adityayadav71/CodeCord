import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useContext } from "react";
import { removeParticipant } from "../../api/roomsAPI";
import { FaUserAlt } from "react-icons/fa";

const User = ({ userId, username, imageURL }) => {
  const { socket, userData } = useContext(AuthContext);
  const { roomData, setRoomData } = useContext(RoomContext);

  const handleRemoveParticipant = async () => {
    let room = await removeParticipant(
      username,
      userId,
      roomData?.roomId,
      socket
    );

    setRoomData(room);
  };

  return (
    <div className="p-4 flex flex-row items-center justify-between bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
      <div className="flex flex-row gap-x-3">
        {imageURL ? (
          <img
            src={`data:${imageURL.contentType};base64,${imageURL.image}`}
            className="w-14 h-14 object-cover rounded-full hover:cursor-pointer"
            alt="profile-pic"
          />
        ) : (
          <FaUserAlt className="text-xl hover:cursor-pointer" />
        )}
        <div>
          <h1 className="text-xl font-bold">{username}</h1>
          <p className="text-base text-grey1">user rating</p>
        </div>
      </div>

      {roomData?.owner?._id === userData?._id && username !== userData?.username && (
        <button
          className="px-3 py-2 font-bold text-lg bg-accent1 transition-all duration-300 hover:bg-lightAccent1 text-white rounded-xl"
          onClick={handleRemoveParticipant}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default User;
