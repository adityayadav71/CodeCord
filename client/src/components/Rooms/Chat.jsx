import { useState, useContext, useEffect, useRef, memo } from "react";
import {
  FaUserPlus,
  FaUserFriends as UserIcon,
  FaSmile,
  FaUserAlt,
  FaCog,
  FaRocketchat,
  FaDoorOpen as LeaveIcon,
  FaDoorClosed as EntryIcon,
} from "react-icons/fa";
import {
  FaCircleXmark as EndIcon,
  FaRankingStar as ScoreboardIcon,
} from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext, loadData } from "../../App";
import { RoomContext } from "../../layouts/AppLayout";
import { useNavigate } from "react-router-dom";
import InviteLinkModal from "./InviteLinkModal";
import { startRoom, leaveRoom, endRoom } from "../../api/roomsAPI";
import Timer from "./Timer";
import { toast } from "react-hot-toast";
import Skeleton from "../skeletons/ChatSkeleton";

const Chat = ({ setOpenScoreboard, isMobileScreen, setShowParticipant }) => {
  const { userData, socket } = useContext(AuthContext);
  const { roomData, setRoomData, isLoading } = useContext(RoomContext);

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [messageList, setMessageList] = useState([]);
  const [participants, setParticipants] = useState(
    roomData?.participants?.length || 0
  );
  const [inviteLinkModal, setInviteLinkModal] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  useEffect(() => {
    const closeModal = (event) => {
      if (
        !event.target.closest(".modal") &&
        !event.target.classList.contains("open-modal")
      ) {
        setInviteLinkModal("");
      }
    };
    document.addEventListener("click", closeModal);
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);

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
          userData?.profile?.avatar?.image &&
          `data:${userData?.profile?.avatar?.contentType};base64,${userData?.profile?.avatar?.image}`,
        timeStamp,
      };
      await socket.emit("send-message", messageData, roomData?.roomId);

      setMessageList((prevList) => [...prevList, messageData]);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      toast(
        (t) => (
          <div className='text-lg w-full'>
            <div className='text-xl mb-1 font-semibold'>
              Are you sure you want to leave?
            </div>
            <div className='text-md mb-2'>
              You will be removed from the room. You can join back anytime.
            </div>
            <div className='flex justify-end gap-3 ml-auto'>
              <button
                className='px-3 py-1 font-medium rounded-lg bg-gray-300 hover:bg-gray-200 duration-300'
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
              <button
                className='px-3 py-1 font-medium rounded-lg bg-accent1 hover:bg-lightAccent1 duration-300 text-white hover:lightAccent1'
                onClick={async () => {
                  await leaveRoom(userData.username, roomData?.roomId, socket);
                  await loadData();
                  toast.dismiss(t.id);
                  navigate("/", { replace: true });
                  toast(
                    (t) => (
                      <div className='flex items-center text-lg'>
                        <span className='mr-3 font-semibold'>
                          🚪You left the <b>room</b>
                        </span>
                        <button
                          className='px-3 py-1 text-md rounded-lg bg-gray-300 border'
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
          <div className='text-lg w-full'>
            <div className='text-xl mb-1 font-semibold'>
              Are you sure you want to end?
            </div>
            <div className='text-md mb-2'>
              The room will be ended for all the participants.
            </div>
            <div className='flex justify-end gap-3 ml-auto'>
              <button
                className='px-3 py-1 font-medium rounded-lg bg-gray-300 hover:bg-gray-200 duration-300'
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
              <button
                className='px-3 py-1 font-medium rounded-lg bg-hardRed hover:bg-redBackGround duration-300 text-white hover:lightAccent1'
                onClick={async () => {
                  await endRoom(roomData?.roomId, socket);
                  await loadData();
                  toast.dismiss(t.id);
                  navigate("/", { replace: true });
                  toast(
                    (t) => (
                      <div className='flex items-center text-lg'>
                        <span className='mr-3 font-semibold'>
                          🛑 You ended the <b>room</b>
                        </span>
                        <button
                          className='px-3 py-1 text-md rounded-lg bg-gray-300 border'
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

  const chatPanelRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  const scrollToBottom = () => {
    if (chatPanelRef.current)
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
  };

  return !isMobileScreen ? (
      <div className="relative flex flex-col h-full">
        <div className="w-full p-3 border-b border-lightSecondary">
          <div className="flex flex-row justify-between gap-x-3 mb-4">
            {isLoading ? (
              <Skeleton />
            ) : (
              <div className='flex flex-col'>
                <h1 className='text-lg font-bold'>{roomData?.name}</h1>
                <p className='text-grey1'>{participants} participants</p>
              </div>
            )}
            <div className='flex flex-row items-center gap-x-1'>
              <div className='relative'>
                <button
                  className='peer switch p-2 flex flex-row items-center justify-center text-2xl rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover transition-all duration-300'
                  data-position='prev'
                  onClick={() => {
                    setShowParticipant((prevState) => !prevState);
                  }}
                >
                  <UserIcon />
                </button>
                <div className='absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-14 px-3 py-1 bg-white text-primary rounded-lg'>
                  Participants
                </div>
              </div>
              <div className='relative'>
                <button
                  className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
                  onClick={(e) => {
                    e.stopPropagation();
                    setInviteLinkModal((prevState) => !prevState);
                  }}
                >
                  <FaUserPlus className='text-xl' />
                </button>
                <div className='absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-14 px-3 py-1 bg-white text-primary rounded-lg'>
                  Invite Code
                </div>
                <InviteLinkModal
                  inviteLinkModal={inviteLinkModal}
                  inviteCode={roomData?.roomId || ""}
                />
              </div>
              <div className='relative'>
                {roomData?.owner?._id !== userData?._id ? (
                  <>
                    <button
                      className='peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
                      onClick={handleLeaveRoom}
                    >
                      <LeaveIcon className='text-xl' />
                    </button>
                    <div className='absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-14 -left-8 px-3 py-1 bg-white text-primary rounded-lg'>
                      Leave
                    </div>
                  </>
                ) : (
                  <>
                    <button className='peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'>
                      <FaCog className='text-xl' />
                    </button>
                    <div className='absolute z-[-10] peer-hover:z-50 peer-hover:scale-100 peer-hover:opacity-100 scale-75 opacity-0 transition-all duration-150 top-14 -left-8 px-3 py-1 bg-white text-primary rounded-lg'>
                      Settings
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          {roomData?.owner?._id === userData?._id && (
            <div className='flex flex-row gap-x-3 w-full mb-2'>
              {roomData?.startedAt ? (
                <>
                  <button
                    className='py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover'
                    onClick={handleLeaveRoom}
                  >
                    Leave Room
                  </button>
                  <button
                    className='py-2 px-4 grow-[5] rounded-lg bg-rose-700 hover:bg-rose-400'
                    onClick={handleEndRoom}
                  >
                    End Room
                  </button>
                </>
              ) : (
                <button
                  className='flex flex-row items-center justify-center gap-x-3 font-bold py-2 px-4 grow-[5] rounded-lg bg-green-500 hover:bg-easyGreen'
                  onClick={handleStartRoom}
                >
                  <EntryIcon className='text-2xl' />
                  Start Room
                </button>
              )}
            </div>
          )}
          <div className='flex flex-row gap-x-3 w-full'>
            <button
              className='scoreboard py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover'
              onClick={() => setOpenScoreboard(true)}
            >
              Scoreboard
            </button>
          </div>
        </div>
        <Timer roomData={roomData} />
        <div className='relative ml-3 mb-14 py-3 overflow-y-hidden'>
          <div
            ref={chatPanelRef}
            className='h-full pr-3 overflow-y-scroll'
            id='chat-window'
          >
            {messageList.map((messageContent, i) => {
              return messageContent?.type === "roomMessage" ? (
                <div
                  key={i}
                  className='flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg'
                >
                  {messageContent.message}
                  <p className='text-sm text-grey1'>
                    {messageContent.timeStamp}
                  </p>
                </div>
              ) : (
                <div key={i} className='flex flex-col gap-y-3 mb-3'>
                  <div className='flex gap-3'>
                    <div className='shrink-0 w-10 h-10 mt-2 flex flex-row items-center justify-center rounded-full bg-grey2'>
                      {messageContent.avatar ? (
                        <img
                          className='rounded-full overflow-clip object-cover h-full w-full'
                          src={messageContent.avatar}
                          alt='user-profile-picture'
                        />
                      ) : (
                        <FaUserAlt className='text-xl hover:cursor-pointer' />
                      )}
                    </div>
                    <div className='flex flex-col justify-center'>
                      <div>
                        <span className='font-bold text-lg'>
                          {messageContent.author}
                        </span>
                        <span className='text-sm ml-3 text-grey1'>
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
        <div className='absolute bottom-0 w-full p-3 bg-secondary'>
          <FaSmile className='absolute top-1/2 -translate-y-1/2 right-6' />
          <form onSubmit={handleSubmit(sendMessage)}>
            <input
              name='message'
              className='pl-3 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg'
              {...register("message")}
              placeholder='Type a message...'
              type='text'
            />
          </form>
        </div>
      </div>
    )
   : (
    <div
      className={`absolute flex gap-4 bottom-5 rounded-lg w-[95%] ${
        mobileChatOpen ? "h-[95%] flex-col" : ""
      } items-end drop-shadow-xl transition-height duration-300 p-3 m-auto left-0 right-0 bg-secondary h-20`}
    >
      <div
        ref={chatPanelRef}
        className={`grow overflow-y-scroll w-full flex flex-col ${
          mobileChatOpen ? "block" : "hidden"
        }`}
        id='chat-window'
      >
        {messageList.map((messageContent, i) => {
          return messageContent?.type === "roomMessage" ? (
            <div
              key={i}
              className='flex flex-row items-center justify-between gap-x-1 px-3 py-2 mb-3 bg-primary rounded-lg'
            >
              {messageContent.message}
              <p className='text-sm text-grey1'>{messageContent.timeStamp}</p>
            </div>
          ) : (
            <div key={i} className='flex flex-col gap-y-3 mb-3'>
              <div className='flex gap-3'>
                <div className='shrink-0 w-10 h-10 mt-2 flex flex-row items-center justify-center rounded-full bg-grey2'>
                  {messageContent.avatar ? (
                    <img
                      className='rounded-full overflow-clip object-cover h-full w-full'
                      src={messageContent.avatar}
                      alt='user-profile-picture'
                    />
                  ) : (
                    <FaUserAlt className='text-xl hover:cursor-pointer' />
                  )}
                </div>
                <div className='flex flex-col justify-center'>
                  <div>
                    <span className='font-bold text-lg'>
                      {messageContent.author}
                    </span>
                    <span className='text-sm ml-3 text-grey1'>
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
      <div
        className={`relative ${
          mobileChatOpen ? "block" : "hidden"
        } w-full bg-secondary`}
      >
        <FaSmile className='absolute top-1/2 -translate-y-1/2 right-6' />
        <form onSubmit={handleSubmit(sendMessage)}>
          <input
            name='message'
            className='pl-3 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg'
            {...register("message")}
            placeholder='Type a message...'
            type='text'
          />
        </form>
      </div>
      <div className='flex gap-1 items-center w-full'>
        <Timer roomData={roomData} />
        <div className='flex flex-wrap gap-2 ml-auto'>
          {roomData?.owner?._id === userData?._id && (
            <div className='flex flex-row gap-x-3'>
              {roomData?.startedAt ? (
                <button
                  className='flex flex-row items-center justify-center gap-x-3 font-bold p-3 w-12 h-12 rounded-xl bg-rose-700 hover:bg-rose-400'
                  onClick={handleEndRoom}
                >
                  <EndIcon className='text-2xl' />
                </button>
              ) : (
                <button
                  className='flex flex-row items-center justify-center gap-x-3 font-bold w-12 h-12 p-3 rounded-lg bg-green-500 hover:bg-easyGreen'
                  onClick={handleStartRoom}
                >
                  <EntryIcon className='text-2xl' />
                </button>
              )}
            </div>
          )}
          <div className='relative'>
            <button
              className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
              onClick={(e) => {
                e.stopPropagation();
                setOpenScoreboard((prev) => !prev);
              }}
            >
              <ScoreboardIcon className='text-xl' />
            </button>
          </div>
          <div className='relative'>
            <button
              className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
              onClick={(e) => {
                e.stopPropagation();
                setMobileChatOpen(false);
                setShowParticipant((prev) => !prev);
              }}
            >
              <UserIcon className='text-xl' />
            </button>
          </div>
          <div className='relative'>
            <button
              className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
              onClick={(e) => {
                e.stopPropagation();
                setMobileChatOpen((prev) => !prev);
              }}
            >
              <FaRocketchat className='text-xl' />
            </button>
          </div>
          <div className='relative'>
            <button
              className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
              onClick={(e) => {
                e.stopPropagation();
                setInviteLinkModal((prevState) => !prevState);
              }}
            >
              <FaUserPlus className='text-xl' />
            </button>
            <InviteLinkModal
              inviteLinkModal={inviteLinkModal}
              inviteCode={roomData?.roomId || ""}
              isMobileScreen={isMobileScreen}
            />
          </div>
          <div className='relative'>
            <button
              className='open-modal peer flex flex-row items-center justify-center p-3 rounded-xl w-12 h-12 bg-lightPrimary hover:bg-hover'
              onClick={(e) => {
                e.stopPropagation();
                handleLeaveRoom();
              }}
            >
              <LeaveIcon className='text-xl' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Chat);
