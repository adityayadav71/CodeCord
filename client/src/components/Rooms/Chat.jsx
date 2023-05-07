import { useState, useContext, useEffect, memo } from "react";
import {
  FaUserPlus,
  FaPhoneAlt,
  FaSmile,
  FaUserAlt,
  FaCog,
  FaDoorOpen as EntryIcon,
  FaDoorClosed as LeaveIcon,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useNavigate } from "react-router-dom";
import InviteLinkModal from "./InviteLinkModal";
import { startRoom, leaveRoom, endRoom } from "../../api/roomsAPI";
import Timer from "./Timer";

const Chat = ({ setOpenScoreboard }) => {
  const { userData, socket } = useContext(AuthContext);
  const { roomData, setRoomData } = useContext(RoomContext);

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [messageList, setMessageList] = useState([]);
  const [participants, setParticipants] = useState(
    roomData?.participants?.length || 0
  );
  const [inviteLinkModal, setInviteLinkModal] = useState(false);

  const sendMessage = async (formData) => {
    if (formData.message !== "") {
      reset(); // reset message input
      const date = new Date();
      const timeStamp = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const messageData = {
        type: "chatMessage",
        message: formData.message,
        author: userData?.username,
        avatar:
          userData?.avatar?.image &&
          `data:${userData?.avatar?.contentType};base64,${userData?.avatar?.image}`,
        timeStamp,
      };
      await socket.emit("send-message", messageData, roomData?.roomId);

      setMessageList((prevList) => [...prevList, messageData]);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom(userData.username, roomData?.roomId, socket);
      navigate("/", { replace: true });
    } catch (err) {
      window.alert(err);
    }
  };

  const handleEndRoom = async () => {
    try {
      await endRoom(roomData?.roomId, socket);
    } catch (err) {
      window.alert(err);
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

  useEffect(() => {
    setParticipants(roomData?.participants?.length);
  }, [roomData]);

  useEffect(() => {
    socket?.on("receive-message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    socket?.on("room-started", (room) => {
      setRoomData(room);
    });
  }, [socket]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full p-3 border-b border-lightSecondary">
        <div className="flex flex-row justify-between gap-x-3 mb-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">
              {roomData?.ownerUsername}'s Room
            </h1>
            <p className="text-grey1">{participants} participants</p>
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <div className="relative">
              <button className="peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
                <FaPhoneAlt className="text-xl" />
              </button>
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-14 px-3 py-1 bg-white text-primary rounded-lg">
                Join Voice Chat
              </div>
            </div>
            <div className="relative">
              <button
                className="peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
                onClick={() => setInviteLinkModal((prevState) => !prevState)}
              >
                <FaUserPlus className="text-xl" />
              </button>
              <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-14 px-3 py-1 bg-white text-primary rounded-lg">
                Invite Code
              </div>
              <InviteLinkModal
                inviteLinkModal={inviteLinkModal}
                inviteCode={roomData?.roomId || ""}
              />
            </div>
            <div className="relative">
              {roomData?.owner !== userData?.user?._id ? (
                <>
                  <button
                    className="peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
                    onClick={handleLeaveRoom}
                  >
                    <LeaveIcon className="text-xl" />
                  </button>
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-14 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                    Leave
                  </div>
                </>
              ) : (
                <>
                  <button className="peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
                    <FaCog className="text-xl" />
                  </button>
                  <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-14 -left-8 px-3 py-1 bg-white text-primary rounded-lg">
                    Settings
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {roomData?.owner === userData?.user?._id && (
          <div className="flex flex-row gap-x-3 w-full mb-2">
            {roomData?.hasStarted ? (
              <>
                <button
                  className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover"
                  onClick={handleLeaveRoom}
                >
                  Leave Room
                </button>
                <button
                  className="py-2 px-4 grow-[5] rounded-lg bg-rose-700 hover:bg-rose-400"
                  onClick={handleEndRoom}
                >
                  End Room
                </button>
              </>
            ) : (
              <button
                className="flex flex-row items-center justify-center gap-x-3 font-bold py-2 px-4 grow-[5] rounded-lg bg-green hover:bg-easyGreen"
                onClick={handleStartRoom}
              >
                <EntryIcon className="text-2xl" />
                Start Room
              </button>
            )}
          </div>
        )}
        <div className="flex flex-row gap-x-3 w-full">
          <button
            className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover"
            onClick={() => setOpenScoreboard(true)}
          >
            Scoreboard
          </button>
        </div>
      </div>
      <Timer roomData={roomData} />
      <div className="relative ml-3 mb-14 py-3 overflow-y-hidden">
        <div className="h-full pr-3 overflow-y-scroll" id="chat-window">
          {messageList.map((messageContent, i) => {
            return messageContent?.type === "roomMessage" ? (
              <div
                key={i}
                className="flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg"
              >
                {messageContent.message}
                <p className="text-grey1">{messageContent.timeStamp}</p>
              </div>
            ) : (
              <div key={i} className="flex flex-col gap-y-3 mb-3">
                <div className="flex gap-3">
                  <div className="shrink-0 w-10 h-10 mt-2 flex flex-row items-center justify-center rounded-full bg-grey2">
                    {messageContent.avatar ? (
                      <img
                        className="rounded-full overflow-clip object-cover h-full w-full"
                        src={messageContent.avatar}
                        alt="user-profile-picture"
                      />
                    ) : (
                      <FaUserAlt className="text-xl hover:cursor-pointer" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <div>
                      <span className="font-bold text-lg">
                        {messageContent.author}
                      </span>
                      <span className="text-sm ml-3 text-grey1">
                        {messageContent.timeStamp}
                      </span>
                    </div>
                    <p>{messageContent.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-3 bg-secondary">
        <FaSmile className="absolute top-1/2 -translate-y-1/2 right-6" />
        <form onSubmit={handleSubmit(sendMessage)}>
          <input
            name="message"
            className="pl-3 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg"
            {...register("message")}
            placeholder="Type a message..."
            type="text"
          />
        </form>
      </div>
    </div>
  );
};

export default memo(Chat);
