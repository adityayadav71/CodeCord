import {
  FaUserPlus,
  FaPhoneAlt,
  FaSmile,
  FaUserAlt,
  FaCog,
} from "react-icons/fa";
import { BiAlarm } from "react-icons/bi";

const Chat = (props) => {
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
        <div className="h-full overflow-y-scroll mb-12">
          <div className="flex flex-col gap-y-3 mb-3">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                  <FaUserAlt className="text-xl hover:cursor-pointer" />
                </div>
              </div>
              <div className="col-span-4">
                <p>User 1</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 mb-3">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                  <FaUserAlt className="text-xl hover:cursor-pointer" />
                </div>
              </div>
              <div className="col-span-4">
                <p>User 2</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 mb-3">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                  <FaUserAlt className="text-xl hover:cursor-pointer" />
                </div>
              </div>
              <div className="col-span-4">
                <p>User 3</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-3 bg-secondary">
        <FaSmile className="absolute top-1/2 -translate-y-1/2 right-6" />
        <input
          className="pl-3 pr-8 p-2 w-full bg-lightPrimary focus:ring-1 focus:ring-accent1  focus:outline-none rounded-lg"
          placeholder="Type a message..."
          type="text"
        />
      </div>
    </div>
  );
};

export default Chat;
