import React from "react";
import { FaMicrophone, FaUserAlt } from "react-icons/fa";

const Chat = (props) => {
  return (
    <div className="flex flex-col">
      <div className="w-full p-3 border-b border-lightSecondary">
        <div className="flex flex-row gap-x-5 mb-4">
          <div className="w-16 h-16 flex flex-row items-center justify-center rounded-full bg-grey2">
            <FaUserAlt className="text-2xl hover:cursor-pointer" />
          </div>
          <div className="flex flex-col gap-y-1">
            <h1 className="text-xl font-bold">Room Name</h1>
            <p>
              <span className="px-2 py-1 bg-accent1 rounded-lg">2</span> participants
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-x-3 w-full">
          <button className="flex flex-row items-center justify-center py-3 px-4 grow-[1] rounded-lg bg-lightPrimary">
            <FaMicrophone className="text-2xl" />
          </button>
          <button className="py-3 px-4 grow-[5] rounded-lg bg-lightPrimary">Scoreboard</button>
        </div>
      </div>
      <div className="grow mx-3 py-3">
        <h1 className="mb-3 uppercase">Messages</h1>
        <div className="relative h-96 overflow-y-scroll">
          <div className="flex flex-col gap-y-3 mb-3">
            <div className="grid grid-cols-6">
              <div className="col-span-1">
                <div className="w-8 h-8 flex flex-row items-center justify-center rounded-full bg-grey2">
                  <FaUserAlt className="text-xl hover:cursor-pointer" />
                </div>
              </div>
              <div className="col-span-4">
                <p>Username</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, ullam pariatur suscipit quibusdam sint expedita voluptatum illum veritatis tempore labore. Omnis nisi cupiditate
                  dolorem veritatis nobis voluptatum optio, officia sapiente.
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
                <p>Username</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, ullam pariatur suscipit quibusdam sint expedita voluptatum illum veritatis tempore labore. Omnis nisi cupiditate
                  dolorem veritatis nobis voluptatum optio, officia sapiente.
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
                <p>Username</p>
              </div>
              <div className="col-span-1 justify-self-end text-lightSecondary">
                <p className="text-grey1">11:55</p>
              </div>
            </div>
            <div className="grow grid grid-cols-6">
              <div className="row-start-2 col-start-2 col-span-5">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas, ullam pariatur suscipit quibusdam sint expedita voluptatum illum veritatis tempore labore. Omnis nisi cupiditate
                  dolorem veritatis nobis voluptatum optio, officia sapiente.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <input className="absolute top-0 px-3 p-2 bg-lightPrimary focus:outline-none rounded-lg" placeholder="Type a message..." type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
