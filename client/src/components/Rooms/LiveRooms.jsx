import React from "react";
import { FaUserAlt } from "react-icons/fa";

const LiveRooms = (props) => {
  return (
    <aside className="flex flex-col px-5 py-6 gap-y-4 w-[288px] max-h-[874px] order-last rounded-xl bg-secondary">
      <section className="relative grow overflow-hidden max-h-1/2">
        <h2 className="text-xl font-bold mb-3">Join Public Rooms</h2>
        <div className="flex flex-col gap-y-3 overflow-hidden w-full">
          <div className="flex flex-col p-3 bg-accent2 rounded-xl w-full h-32 leading-tight">
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold">Room Name</h2>
                <p>Room Description</p>
              </div>
              <p>x 2</p>
            </div>
            <div className="flex flex-row justify-end items-end grow">
              <button className="bg-accent1 hover:bg-lightAccent1 transition-all duration-300 p-1 w-20 rounded-lg text-white font-bold">Join</button>
            </div>
          </div>
          <div className="flex flex-col p-3 bg-accent2 rounded-xl w-full h-32 leading-tight">
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold">Room Name</h2>
                <p>Room Description</p>
              </div>
              <p>x 2</p>
            </div>
            <div className="flex flex-row justify-end items-end grow">
              <button className="bg-accent1 hover:bg-lightAccent1 transition-all duration-300 p-1 w-20 rounded-lg text-white font-bold">Join</button>
            </div>
          </div>
          <div className="flex flex-col p-3 bg-accent2 rounded-xl w-full h-32 leading-tight">
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-bold">Room Name</h2>
                <p>Room Description</p>
              </div>
              <p>x 2</p>
            </div>
            <div className="flex flex-row justify-end items-end grow">
              <button className="bg-accent1 hover:bg-lightAccent1 transition-all duration-300 p-1 w-20 rounded-lg text-white font-bold">Join</button>
            </div>
          </div>
        </div>
        <section className="absolute bottom-0 left-0 flex flex-row items-center justify-center gradient w-full h-36">
          <p>Browse more rooms</p>
        </section>
      </section>
      <section className="grow">
        <h2 className="text-xl font-bold mb-3">Friends</h2>
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
