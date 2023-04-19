import { useState, useContext, useEffect, memo } from "react";
import {
  FaUserPlus,
  FaPhoneAlt,
  FaSmile,
  FaUserAlt,
  FaCog,
} from "react-icons/fa";
import { GiExitDoor as LeaveIcon } from "react-icons/gi";
import { BiAlarm } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { leaveRoom } from "../../api/roomsAPI";

const Chat = ({ socket }) => {
  const { userData } = useContext(AuthContext);
  const { roomData } = useContext(RoomContext);

  const navigate = useNavigate();
  const params = useParams();

  const { register, handleSubmit, reset } = useForm();
  const [messageList, setMessageList] = useState([]);

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
    const res = await leaveRoom(
      userData.user._id,
      userData.username,
      params.name,
      socket
    );
    navigate("/");
  };

  useEffect(() => {
    socket?.on("receive-message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });
  }, [socket]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full p-3 border-b border-lightSecondary">
        <div className="flex flex-row justify-between gap-x-3 mb-4">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-bold">Room Name</h1>
            <p className="text-grey1">
              {roomData?.participants.length} participants
            </p>
          </div>
          <div className="flex flex-row items-center gap-x-1">
            <button className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
              <FaPhoneAlt className="text-xl" />
            </button>
            <button className="flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover">
              <FaUserPlus className="text-xl" />
            </button>
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
            <button
              className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover"
              onClick={handleLeaveRoom}
            >
              Leave Room
            </button>
            <button className="py-2 px-4 grow-[5] rounded-lg bg-rose-700 hover:bg-rose-400">
              End Room
            </button>
          </div>
        )}
        <div className="flex flex-row gap-x-3 w-full">
          <button className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover">
            Scoreboard
          </button>
        </div>
      </div>
      <h1 className="flex flex-row items-center gap-x-3 bg-lightSecondary px-6 py-2 mb-3">
        <BiAlarm className="text-xl" />
        Round ends in
        <span className="bg-accent1 rounded-lg px-3 font-bold">30:00</span>
      </h1>
      <div className="relative mx-3 py-3 overflow-y-hidden">
        <div className="h-full overflow-y-scroll mb-12" id="chat-window">
          {messageList.map((messageContent) => {
            return messageContent?.type === "roomMessage" ? (
              <div className="flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg">
                {messageContent.message}
                <p className="text-grey1">{messageContent.timeStamp}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-3 mb-3">
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
