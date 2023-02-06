import RoomCard from "./RoomCard";
import { FaUserAlt } from "react-icons/fa";

const LiveRooms = (props) => {
  return (
    <aside className="relative flex flex-col px-5 py-6 gap-y-4 w-[288px] max-h-[874px] order-last rounded-xl bg-secondary">
      <section className="flex flex-col grow h-80">
        <h2 className="text-2xl font-bold mb-3">Join Public Rooms</h2>
        <div className="flex flex-col gap-y-3 grow hideScrollbar overflow-scroll w-full">
          <RoomCard name="Room name" description="Room description" participants="2" />
          <RoomCard name="Room name" description="Room description" participants="2" />
          <RoomCard name="Room name" description="Room description" participants="2" />
          <RoomCard name="Room name" description="Room description" participants="2" />
        </div>
      </section>
      <section className="absolute z-[1] top-1/2 left-0 -translate-y-1/2 flex flex-row items-center justify-center gradient w-full h-40">
        <a href="#" className="hover:text-accent1 hover:cursor-pointer">Browse more rooms</a>
      </section>
      <section className="z-[2] grow">
        <h2 className="text-2xl font-bold mb-3">Friends</h2>
        <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
          <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
            <FaUserAlt className="text-4xl hover:cursor-pointer" />
          </div>
          <div className="flex flex-col text-white leading-snug">
            <h2 className="font-bold text-lg">Username</h2>
            <p>Status</p>
          </div>
        </div>
        <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
          <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
            <FaUserAlt className="text-4xl hover:cursor-pointer" />
          </div>
          <div className="flex flex-col text-white leading-snug">
            <h2 className="font-bold text-lg">Username</h2>
            <p>Status</p>
          </div>
        </div>
        <div className="flex flex-row rounded-xl w-full gap-x-3 items-center p-3 hover:bg-hover hover:cursor-pointer">
          <div className="flex flex-row items-center justify-center h-12 w-12 bg-grey2 rounded-full">
            <FaUserAlt className="text-4xl hover:cursor-pointer" />
          </div>
          <div className="flex flex-col text-white leading-snug">
            <h2 className="font-bold text-lg">Username</h2>
            <p>Status</p>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default LiveRooms;
