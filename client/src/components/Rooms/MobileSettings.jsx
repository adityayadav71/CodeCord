import { useContext } from "react";
import { RoomContext } from "../../layouts/AppLayout";
import { FaUserPlus as InviteLinkIcon, FaPhoneAlt as PhoneIcon, FaDoorOpen as LeaveIcon } from "react-icons/fa";
import { FaCircleXmark as EndIcon } from "react-icons/fa6";
import Timer from "./Timer";

const MobileSettings = () => {
  const { roomData } = useContext(RoomContext);
  return (
    <div className="lg:h-fit lg:w-80 px-2 py-3">
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
        <button className="flex items-center gap-3 px-6 py-2 bg-accent1 font-semibold rounded-lg hover:cursor-pointer hover:bg-lightAccent1">
          <LeaveIcon className="text-xl" />
          <p>Leave Room</p>
        </button>
        <button className="flex items-center gap-3 px-6 py-2 bg-hardRed font-semibold rounded-lg hover:cursor-pointer hover:bg-redBackGround">
          <EndIcon className="text-xl" />
          <p>End Room</p>
        </button>
      </div>
    </div>
  );
};

export default MobileSettings;
