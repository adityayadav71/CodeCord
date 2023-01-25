import React from "react";

const PastContest = ({name, timeStamp}) => {
  return (
    <div className="p-4 flex flex-row justify-between hover:bg-hover hover:text-accent1 hover:cursor-pointer rounded-xl">
      <div>
        <h1 className="text-xl font-bold">{name}</h1>
        <p className="text-base text-grey1">{timeStamp}</p>
      </div>
      <button className="p-3 font-bold text-lg bg-accent1 transition-all duration-300 hover:bg-lightAccent1 text-white rounded-xl">Create Room</button>
    </div>
  );
};

export default PastContest;
