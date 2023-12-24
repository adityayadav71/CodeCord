import { FaDoorClosed, FaPhoneAlt, FaRocketchat, FaUserPlus } from "react-icons/fa";

const MobileRoomBar = ({ roomData }) => {
  return (
    <div className="absolute flex items-center gap-3 bottom-5 rounded-lg w-[95%] p-3 m-auto left-0 right-0 bg-secondary h-20">
      <div>
        <p className="text-grey1">Room ends in</p>
        <h1 className="text-lg font-bold"></h1>
      </div>
      <div className="flex gap-3 ml-auto">
        <div className="relative">
          <button
            className="open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaPhoneAlt className="text-xl" />
          </button>
        </div>
        <div className="relative">
          <button
            className="open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaRocketchat className="text-xl" />
          </button>
        </div>
        <div className="relative">
          <button
            className="open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
              // setInviteLinkModal((prevState) => !prevState);
            }}
          >
            <FaUserPlus className="text-xl" />
          </button>
          {/* <InviteLinkModal inviteLinkModal={inviteLinkModal} inviteCode={roomData?.roomId || ""} /> */}
        </div>
        <div className="relative">
          <button
            className="open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FaDoorClosed className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileRoomBar;
