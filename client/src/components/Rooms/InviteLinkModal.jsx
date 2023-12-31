import { useContext } from "react";
import RoomInviteLink from "./RoomInviteLink";
import { RoomContext } from "../../layouts/AppLayout";

const InviteLinkModal = ({ isMobileScreen }) => {
  const { roomData } = useContext(RoomContext);
  return (
    <div className={`modal z-50 absolute ${isMobileScreen ? "-top-36 right-0" : "top-16 right-0"} w-96 h-42 overflow-y-scroll px-4 py-3 drop-shadow-xl rounded-xl transition duration-300 bg-secondary`}>
      <div className="mb-3">
        <RoomInviteLink inviteLink={roomData?.roomId} />
      </div>
    </div>
  );
};

export default InviteLinkModal;
