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
import { RoomContext, populateParticipants } from "../../layouts/AppLayout";
import { useNavigate, useParams } from "react-router-dom";
import { leaveRoom } from "../../api/roomsAPI";
import InviteLinkModal from "./InviteLinkModal";
import { startRoom } from "../../api/roomsAPI";
import Timer from "./Timer";

const Chat = () => {
  const { userData, socket } = useContext(AuthContext);
  const { roomData, setRoomData } = useContext(RoomContext);

  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [messageList, setMessageList] = useState([]);
  const [participants, setParticipants] = useState(
    roomData?.participants?.length || 0
  );
  const [inviteLinkModal, setInviteLinkModal] = useState(false);

  const sendMessage = async (formData) => {
    if (formData.message !== "") {
      reset(); // reset message input
      const messageData = {
        type: "chatMessage",
        message: formData.message,
        author: userData?.username,
        avatar:
          userData?.avatar?.image &&
          `data:${userData?.avatar?.contentType};base64,${userData?.avatar?.image}`,
        timeStamp:
          new Date(Date.now()).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      };
      await socket.emit("send-message", messageData, params.name);

      setMessageList((prevList) => [...prevList, messageData]);
    }
  };

  const handleLeaveRoom = async () => {
    const res = await leaveRoom(userData.username, params.name, socket);
    navigate("/");
  };

  const handleStartRoom = async () => {
    const room = await startRoom(roomData?.roomId, socket);
    const populatedRoom = await populateParticipants(room);
    setRoomData(populatedRoom);
  };

  useEffect(() => {
    setParticipants(roomData?.participants?.length);
  }, [roomData]);

  useEffect(() => {
    socket?.on("receive-message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    socket?.on("room-started", (room) => {
      localStorage.setItem("room", JSON.stringify(room));
      setRoomData(room);
    });
  }, [socket]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full p-3 border-b border-lightSecondary">
        <div className="flex flex-row justify-between gap-x-3 mb-4">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-bold">
              {roomData?.ownerUsername}'s Room
            </h1>
            <p className="text-grey1">{participants} participants</p>
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <button className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
              <FaPhoneAlt className="text-xl" />
            </button>
            <div className="relative">
              <button
                className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
                onClick={() => setInviteLinkModal((prevState) => !prevState)}
              >
                <FaUserPlus className="text-xl" />
              </button>
              <InviteLinkModal
                inviteLinkModal={inviteLinkModal}
                inviteCode={roomData?.roomId || ""}
              />
            </div>
            <button className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
              <FaCog className="text-xl" />
            </button>

            {roomData?.owner !== userData?.user?._id && (
              <button
                className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover"
                onClick={handleLeaveRoom}
              >
                <LeaveIcon className="text-xl" />
              </button>
            )}
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
                <button className="py-2 px-4 grow-[5] rounded-lg bg-rose-700 hover:bg-rose-400">
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
          <button className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover">
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
                <div className="grid grid-cols-6">
                  <div className="col-span-1">
                    <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
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
                  </div>
                  <div className="col-span-4">
                    <p>{messageContent.author}</p>
                  </div>
                  <div className="col-span-1 justify-self-end text-lightSecondary">
                    <p className="text-grey1">{messageContent.timeStamp}</p>
                  </div>
                </div>
                <div className="grow grid grid-cols-6">
                  <div className="row-start-2 col-start-2 col-span-5">
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
