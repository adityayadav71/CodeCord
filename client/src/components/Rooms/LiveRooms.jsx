import RoomCard from "./RoomCard";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../../App";
import { useState, useContext, useEffect, memo } from "react";
import { getPublicRooms } from "../../api/roomsAPI";
import { Link } from "react-router-dom";
import { TbDoorOff } from "react-icons/tb";
import Skeleton from "../skeletons/LiveRoomsSkeleton";

const LiveRooms = () => {
  const { isLoggedIn, socket } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const rooms = await getPublicRooms();
      setRooms(rooms);
      setIsLoading(false);
    };
    loadData();
    socket?.on("live-rooms-update", () => loadData());
  }, [socket]);

  return (
    <aside className="relative flex flex-col px-5 py-6 gap-y-4 md:ml-auto xl:w-[300px] lg:w-1/4 md:w-2/5 max-h-[674px] order-last rounded-xl bg-secondary">
      <section className="flex flex-col grow h-80">
        <h2 className="text-2xl font-bold mb-3">Join Public Rooms</h2>
        {!isLoggedIn && <div className="bg-yellowBackGround border border-mediumYellow text-md font-semibold px-3 py-1 mb-3 rounded-lg">Login to create and join rooms</div>}
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className={`flex flex-col gap-y-3 grow hideScrollbar overflow-scroll w-full ${rooms.length > 0 ? "fade-in visible" : ""}`}>
            {rooms.length > 0 ? (
              rooms?.map((room, i) => {
                const expiresAt = new Date(room.expiresAt).getTime() - Date.now();
                const remainingTime = room.startedAt ? (expiresAt > 0 ? expiresAt / 1000 : 0) : room.settings.timeLimit * 60;

                return (
                  <RoomCard
                    key={i}
                    name={room.name}
                    id={room.roomId}
                    difficulty={room.settings.difficulty}
                    roomType={room.settings.roomType}
                    started={!!room.startedAt}
                    remainingTimeInSeconds={remainingTime}
                    participants={room.participants.length}
                    participantLimit={room.settings.participantsLimit}
                  />
                );
              })
            ) : (
              <div className="flex flex-col gap-3 my-auto items-center justify-center">
                <TbDoorOff className="text-9xl text-grey1" />
                <p className="text-grey1">No one is online ☹️</p>
              </div>
            )}
          </div>
        )}
      </section>
      {isLoggedIn && (
        <>
          <section className="absolute z-[1] top-1/2 left-0 -translate-y-1/2 flex flex-row items-center justify-center gradient w-full h-40">
            {rooms.length > 0 && (
              <Link to="/app/rooms" className="hover:text-accent1 hover:cursor-pointer">
                Browse more rooms
              </Link>
            )}
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
        </>
      )}
    </aside>
  );
};

export default memo(LiveRooms);
