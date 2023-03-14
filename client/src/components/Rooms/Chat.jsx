import { FaUserPlus, FaPhoneAlt, FaSmile, FaUserAlt, FaCog } from "react-icons/fa";
import { BiAlarm } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../App";

const Chat = ({ socket, roomMessage, setRoomMessage }) => {
  const { userData } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const [messages, setMessages] = useState([]);

  const sendMessage = (formData) => {
    reset();
    setMessages((prevMessages) => [
      ...prevMessages,
      <div className="flex flex-col gap-y-3 mb-3">
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
              <FaUserAlt className="text-xl hover:cursor-pointer" />
            </div>
          </div>
          <div className="col-span-4">
            <p>{userData.username}</p>
          </div>
          <div className="col-span-1 justify-self-end text-lightSecondary">
            <p className="text-grey1">{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</p>
          </div>
        </div>
        <div className="grow grid grid-cols-6">
          <div className="row-start-2 col-start-2 col-span-5">
            <p>{formData.message}</p>
          </div>
        </div>
      </div>,
    ]);
    socket.emit("send-message", formData.message, userData?.username);
  };

  socket?.on("receive-message", (message, username) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      <div className="flex flex-col gap-y-3 mb-3">
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
              <FaUserAlt className="text-xl hover:cursor-pointer" />
            </div>
          </div>
          <div className="col-span-4">
            <p>{username}</p>
          </div>
          <div className="col-span-1 justify-self-end text-lightSecondary">
            <p className="text-grey1">{new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</p>
          </div>
        </div>
        <div className="grow grid grid-cols-6">
          <div className="row-start-2 col-start-2 col-span-5">
            <p>{message}</p>
          </div>
        </div>
      </div>,
    ]);
  });

  useEffect(() => {
    if (roomMessage) setRoomMessage((message) => <div className="px-3 py-2 bg-primary rounded-lg">{message}</div>);
  }, []);

  return (
    <div className="relative flex flex-col h-full">
      <div className="w-full p-3 border-b border-lightSecondary">
        <div className="flex flex-row justify-between gap-x-3 mb-4">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-lg font-bold">Room Name</h1>
            <p className="text-grey1">2 participants</p>
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
          </div>
        </div>
        <div className="flex flex-row gap-x-3 w-full">
          <button className="py-2 px-4 grow-[5] rounded-lg bg-lightPrimary hover:bg-hover">Scoreboard</button>
        </div>
      </div>
      <h1 className="flex flex-row items-center gap-x-3 bg-lightSecondary px-6 py-2 mb-3">
        <BiAlarm className="text-xl" />
        Round ends in
        <span className="bg-accent1 rounded-lg px-3 font-bold">30:00</span>
      </h1>
      <div className="relative mx-3 py-3 overflow-y-hidden">
        <div className="h-full overflow-y-scroll mb-12">
          {messages}
          {roomMessage}
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

export default Chat;
