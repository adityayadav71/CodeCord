import React from "react";

const RoomCard = ({name, description, participants}) => {
  return (
    <div className="flex flex-col p-3 bg-accent2 rounded-xl w-full h-32 leading-tight last:mb-24">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <p>{description}</p>
        </div>
        <p>x {participants}</p>
      </div>
      <div className="flex flex-row justify-end items-end grow">
        <button className="bg-accent1 hover:bg-lightAccent1 transition-all duration-300 p-1 w-20 rounded-lg text-white font-bold">Join</button>
      </div>
    </div>
  );
};

export default RoomCard;
