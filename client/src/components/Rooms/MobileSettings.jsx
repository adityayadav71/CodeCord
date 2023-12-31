import { useContext } from "react";
import { RoomContext } from "../../layouts/AppLayout";
import { FaUserPlus as InviteLinkIcon, FaPhoneAlt as PhoneIcon, FaDoorClosed as StartIcon, FaDoorOpen as LeaveIcon } from "react-icons/fa";
import { FaCircleXmark as EndIcon } from "react-icons/fa6";
import Timer from "./Timer";
import { AuthContext } from "../../App";

const MobileSettings = ({ handleEndRoom, handleLeaveRoom, handleStartRoom }) => {
  const { roomData } = useContext(RoomContext);
  const { userData } = useContext(AuthContext);
  return (
    <div className="modal absolute top-14 right-0 bg-secondary shadow-dropDown z-50 rounded-lg lg:h-fit lg:w-80 w-96 p-3">
      <div className="flex flex-col mb-2">
        <p className="text-xl font-bold">{roomData?.name}</p>
        <p className="text-grey1">{roomData?.participants?.length || 0} participants</p>
      </div>
      <Timer roomData={roomData} />
      <div className="flex flex-col justify-center gap-3 mt-6">
        <button className="flex items-center gap-3 px-6 py-2 bg-accent3 font-semibold rounded-lg hover:cursor-pointer hover:bg-lightAccent3">
          <InviteLinkIcon className="text-xl" />
          <p>Copy Invite Link</p>
        </button>
        <button className="flex items-center gap-3 px-6 py-2 bg-accent3 font-semibold rounded-lg hover:cursor-pointer hover:bg-lightAccent3">
          <PhoneIcon className="text-xl" />
          <p>Voice Call</p>
        </button>
        {roomData?.owner?._id === userData?._id &&
          (roomData?.startedAt ? (
            <button className="flex items-center gap-3 px-6 py-2 bg-hardRed font-semibold rounded-lg hover:cursor-pointer hover:bg-redBackGround" onClick={handleEndRoom}>
              <EndIcon className="text-xl" />
              <p>End Room</p>
            </button>
          ) : (
            <button className="flex items-center gap-3 px-6 py-2 bg-green-600 font-semibold rounded-lg hover:cursor-pointer hover:bg-easyGreen" onClick={handleStartRoom}>
              <StartIcon className="text-xl" />
              <p>Start Room</p>
            </button>
          ))}
        <button className="flex items-center gap-3 px-6 py-2 bg-accent1 font-semibold rounded-lg hover:cursor-pointer hover:bg-lightAccent1" onClick={handleLeaveRoom}>
          <LeaveIcon className="text-xl" />
          <p>Leave Room</p>
        </button>
      </div>
    </div>
  );
};

export default MobileSettings;
