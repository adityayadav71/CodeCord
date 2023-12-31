import { IoMdChatbubbles } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import {
  FaUserPlus as InviteLinkIcon,
  FaPhoneAlt as PhoneIcon,
  FaDoorOpen as LeaveIcon,
  FaDoorClosed as EntryIcon,
  FaExpand as MaximizeIcon,
  FaCog as SettingsIcon,
} from "react-icons/fa";
import { FaCircleXmark as EndIcon } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import { useState, useContext } from "react";
import { RoomContext } from "../../layouts/AppLayout";
import { AuthContext } from "../../App";
import { MobileContext } from "../../layouts/AppLayout";
import Timer from "../Rooms/Timer";
import MobileSettings from "../Rooms/MobileSettings";

function RoomNavbar({ isMobileScreen }) {
  const { roomData } = useContext(RoomContext);
  const { userData } = useContext(AuthContext);
  const { mobileChatOpen, setMobileChatOpen } = useContext(MobileContext);

  const [roomSettingsOpen, setRoomSettingsOpen] = useState(false);

  const handleLeaveRoom = async () => {
    try {
      toast(
        (t) => (
          <div className="text-lg w-full">
            <div className="text-xl mb-1 font-semibold">
              Are you sure you want to leave?
            </div>
            <div className="text-md mb-2">
              You will be removed from the room. You can join back anytime.
            </div>
            <div className="flex justify-end gap-3 ml-auto">
              <button
                className="px-3 py-1 font-medium rounded-lg bg-gray-300 hover:bg-gray-200 duration-300"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 font-medium rounded-lg bg-accent1 hover:bg-lightAccent1 duration-300 text-white hover:lightAccent1"
                onClick={async () => {
                  await leaveRoom(userData.username, roomData?.roomId, socket);
                  await loadData();
                  toast.dismiss(t.id);
                  navigate("/", { replace: true });
                  toast(
                    (t) => (
                      <div className="flex items-center text-lg">
                        <span className="mr-3 font-semibold">
                          🚪You left the <b>room</b>
                        </span>
                        <button
                          className="px-3 py-1 text-md rounded-lg bg-gray-300 border"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          Dismiss
                        </button>
                      </div>
                    ),
                    { duration: Infinity }
                  );
                }}
              >
                Leave
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Prevent auto-dismissal
        }
      );
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleEndRoom = async () => {
    try {
      toast(
        (t) => (
          <div className="text-lg w-full">
            <div className="text-xl mb-1 font-semibold">
              Are you sure you want to end?
            </div>
            <div className="text-md mb-2">
              The room will be ended for all the participants.
            </div>
            <div className="flex justify-end gap-3 ml-auto">
              <button
                className="px-3 py-1 font-medium rounded-lg bg-gray-300 hover:bg-gray-200 duration-300"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 font-medium rounded-lg bg-hardRed hover:bg-redBackGround duration-300 text-white hover:lightAccent1"
                onClick={async () => {
                  await endRoom(roomData?.roomId, socket);
                  await loadData();
                  toast.dismiss(t.id);
                  navigate("/", { replace: true });
                  toast(
                    (t) => (
                      <div className="flex items-center text-lg">
                        <span className="mr-3 font-semibold">
                          🛑 You ended the <b>room</b>
                        </span>
                        <button
                          className="px-3 py-1 text-md rounded-lg bg-gray-300 border"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          Dismiss
                        </button>
                      </div>
                    ),
                    { duration: Infinity }
                  );
                }}
              >
                End
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity, // Prevent auto-dismissal
        }
      );
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
    }
  };

  const handleStartRoom = async () => {
    try {
      const room = await startRoom(roomData?.roomId, socket);
      setRoomData(room);
    } catch (err) {
      window.alert(err);
    }
  };

  return isMobileScreen ? (
    <nav className="p-4 flex justify-between">
      <Timer roomData={roomData} />
      <div className="flex gap-2 items-center">
        <IoMdChatbubbles className="modal sm:hidden hover:cursor-pointer left-4 text-5xl p-3 rounded-lg bg-[#283647]" />
        <IoSettingsSharp className="modal sm:hidden hover:cursor-pointer left-4 text-5xl p-3 rounded-lg bg-[#283647]" />
      </div>
    </nav>
  ) : (
    <nav className="px-6 py-3 flex justify-between">
      <div className="flex flex-col justify-center">
        <p className="text-2xl font-semibold tracking-wide">{roomData?.name}</p>
        <div className="flex items-center gap-3">
          <p className="text-grey1">
            {roomData?.participants?.length || 0} participants
          </p>
          <Timer roomData={roomData} />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {isMobileScreen ? (
          <>
            <button
              className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary"
              onClick={() => setMobileChatOpen((prev) => !prev)}
            >
              <FaRocketchat className="text-xl" />
            </button>
            {roomData?.owner?._id === userData?._id &&
              (roomData?.startedAt ? (
                <button className="flex items-center gap-3 w-12 h-12 p-3 bg-hardRed font-semibold rounded-lg hover:cursor-pointer hover:bg-redBackGround">
                  <EndIcon className="text-xl" />
                </button>
              ) : (
                <button className="flex items-center gap-3 w-12 h-12 p-3 bg-green-600 font-semibold rounded-lg hover:cursor-pointer hover:bg-easyGreen">
                  <EntryIcon className="text-xl" />
                </button>
              ))}
            <button className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary">
              <SettingsIcon className="text-xl" />
            </button>
          </>
        ) : (
          <>
            {roomData?.owner?._id === userData?._id &&
              (roomData?.startedAt ? (
                <button className="flex items-center gap-3 px-3 py-2 bg-hardRed font-semibold rounded-lg hover:cursor-pointer hover:bg-redBackGround min-w-[126px]">
                  <EndIcon className="text-xl" />
                  <p>End Room</p>
                </button>
              ) : (
                <button className="flex items-center gap-3 px-3 py-2 bg-green-600 font-semibold rounded-lg hover:cursor-pointer hover:bg-easyGreen min-w-[126px]">
                  <EntryIcon className="text-xl" />
                  <p>Start Room</p>
                </button>
              ))}
            <button className="flex min-w-[126px] items-center gap-3 px-3 py-2 bg-accent1 font-semibold rounded-lg hover:cursor-pointer hover:bg-lightAccent1">
              <LeaveIcon className="text-xl" />
              <p>Leave Room</p>
            </button>

            <button className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary">
              <MaximizeIcon className="text-xl" />
            </button>
            <button className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary">
              <PhoneIcon className="text-xl" />
            </button>
            <button className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary">
              <InviteLinkIcon className="text-xl" />
            </button>
            <div className="relative">
              <button
                className="text-center gap-3 w-12 h-12 p-3 bg-secondary font-semibold rounded-lg hover:cursor-pointer hover:bg-lightSecondary"
                onClick={() => setRoomSettingsOpen((prev) => !prev)}
              >
                <SettingsIcon className="text-xl" />
              </button>
              {roomSettingsOpen && <MobileSettings />}
            </div>
          </>
        )}
      </div>
      {/* Use this modal, once ready */}
      {/* <MobileSettings imageURL={imageURL} openRoomModal={openRoomModal} goToActiveRoom={goToActiveRoom} handleLogout={handleLogout} /> */}
    </nav>
  );
}

export default RoomNavbar;
