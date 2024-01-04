import { useState, useContext, useEffect, useRef, memo } from "react";
import { FaUserFriends as UserIcon, FaUserAlt } from "react-icons/fa";
import { FaRegPaperPlane as SendButtonIcon } from "react-icons/fa6";
import { IoMdChatbubbles as ChatIcon } from "react-icons/io";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { MobileContext } from "../../layouts/AppLayout";
import User from "./User";

const Chat = ({ isMobileScreen }) => {
  const { userData, socket } = useContext(AuthContext);
  const { roomData, setRoomData } = useContext(RoomContext);
  const { mobileChatOpen } = useContext(MobileContext);

  const { register, handleSubmit, reset } = useForm();
  const [messageList, setMessageList] = useState([]);
  const [isChatOpen, setChatOpen] = useState(true);

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
        avatar: userData?.profile?.avatar?.image && `data:${userData?.profile?.avatar?.contentType};base64,${userData?.profile?.avatar?.image}`,
        timeStamp,
      };
      await socket.emit("send-message", messageData, roomData?.roomId);

      setMessageList((prevList) => [...prevList, messageData]);
    }
  };

  useEffect(() => {
    socket?.on("receive-message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    socket?.on("room-started", (room) => {
      setRoomData(room);
    });
  }, [socket]);

  const chatPanelRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (chatPanelRef.current) chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
  };

  return !isMobileScreen ? (
    <div className="relative flex flex-col h-full">
      <div className="flex items-center gap-3 p-3 w-full">
        <button
          className={`flex items-center justify-center gap-3 w-1/2 text-center p-3 transition-all duration-300 hover:bg-greenBackGround ${
            isChatOpen ? "bg-greenBackGround" : "bg-lightAccent3"
          } rounded-lg`}
          onClick={() => setChatOpen(true)}
        >
          <ChatIcon className="text-xl" />
          <p>CHAT</p>
        </button>
        <button
          className={`flex items-center justify-center gap-3 w-1/2 text-center p-3 transition-all duration-300 hover:bg-greenBackGround ${
            isChatOpen ? "bg-lightAccent3" : "bg-greenBackGround"
          } rounded-lg`}
          onClick={() => setChatOpen(false)}
        >
          <UserIcon className="text-xl" />
          <p>PLAYERS</p>
        </button>
      </div>
      {isChatOpen ? (
        <>
          <div className="relative ml-3 mb-14 py-3 overflow-y-hidden">
            <div ref={chatPanelRef} className="h-full pr-3 overflow-y-scroll" id="chat-window">
              {messageList.map((messageContent, i) => {
                return messageContent?.type === "roomMessage" ? (
                  <div key={i} className="flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg">
                    {messageContent.message}
                    <p className="text-sm text-grey1">{messageContent.timeStamp}</p>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col gap-y-3 mb-3">
                    <div className="flex gap-3">
                      <div className="shrink-0 w-10 h-10 mt-2 flex flex-row items-center justify-center rounded-full bg-grey2">
                        {messageContent.avatar ? (
                          <img className="rounded-full overflow-clip object-cover h-full w-full" src={messageContent.avatar} alt="user-profile-picture" />
                        ) : (
                          <FaUserAlt className="text-xl hover:cursor-pointer" />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div>
                          <span className="font-bold text-lg">{messageContent.author}</span>
                          <span className="text-sm ml-3 text-grey1">{messageContent.timeStamp}</span>
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
            <form onSubmit={handleSubmit(sendMessage)}>
              <input
                name="message"
                className="pl-3 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg"
                {...register("message")}
                placeholder="Type a message..."
                type="text"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-4 p-3 rounded-lg hover:bg-lightAccent3">
                <SendButtonIcon />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="hideScrollbar flex flex-col gap-3 relative p-3 overflow-y-scroll">
          {roomData?.participants?.map((participant, i) => (
            <User key={i} userId={participant.userId} username={participant.username} imageURL={participant.avatar} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div
      className={`modal absolute flex gap-4 top-24 rounded-lg w-[95%] ${
        mobileChatOpen ? "h-[79%] flex-col p-3" : "h-0"
      } items-end drop-shadow-xl transition-height  duration-300 m-auto left-0 right-0 bg-secondary z-20`}
    >
      <div className={`flex items-center gap-3 ${mobileChatOpen ? "block" : "hidden"} w-full`}>
        <button
          className={`flex items-center justify-center gap-3 w-1/2 text-center p-3 transition-all duration-300 hover:bg-greenBackGround ${
            isChatOpen ? "bg-greenBackGround" : "bg-lightAccent3"
          } rounded-lg`}
          onClick={() => setChatOpen(true)}
        >
          <ChatIcon className="text-xl" />
          <p>CHAT</p>
        </button>
        <button
          className={`flex items-center justify-center gap-3 w-1/2 text-center p-3 transition-all duration-300 hover:bg-greenBackGround ${
            isChatOpen ? "bg-lightAccent3" : "bg-greenBackGround"
          } rounded-lg`}
          onClick={() => setChatOpen(false)}
        >
          <UserIcon className="text-xl" />
          <p>PLAYERS</p>
        </button>
      </div>
      {isChatOpen ? (
        <>
          <div ref={chatPanelRef} className={`grow overflow-y-scroll p-3 w-full flex flex-col ${mobileChatOpen ? "block" : "hidden"}`} id="chat-window">
            {messageList.map((messageContent, i) => {
              return messageContent?.type === "roomMessage" ? (
                <div key={i} className="flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg">
                  {messageContent.message}
                  <p className="text-sm text-grey1">{messageContent.timeStamp}</p>
                </div>
              ) : (
                <div key={i} className="flex flex-col gap-y-3 mb-3">
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 mt-2 flex flex-row items-center justify-center rounded-full bg-grey2">
                      {messageContent.avatar ? (
                        <img className="rounded-full overflow-clip object-cover h-full w-full" src={messageContent.avatar} alt="user-profile-picture" />
                      ) : (
                        <FaUserAlt className="text-xl hover:cursor-pointer" />
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div>
                        <span className="font-bold text-lg">{messageContent.author}</span>
                        <span className="text-sm ml-3 text-grey1">{messageContent.timeStamp}</span>
                      </div>
                      <p>{messageContent.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={`relative w-full ${mobileChatOpen ? "block" : "hidden"} mt-auto`}>
            <form onSubmit={handleSubmit(sendMessage)}>
              <input
                name="message"
                className="pl-6 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg"
                {...register("message")}
                placeholder="Type a message..."
                type="text"
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-1 p-3 rounded-lg hover:bg-lightAccent3">
                <SendButtonIcon />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="hideScrollbar flex flex-col gap-3 relative p-3 w-full overflow-y-scroll">
          {roomData?.participants?.map((participant, i) => (
            <User key={i} userId={participant.userId} username={participant.username} imageURL={participant.avatar} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Chat);
