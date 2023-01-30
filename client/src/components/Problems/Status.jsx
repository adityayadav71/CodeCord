import React from "react";
import { FaAngleDown, FaMinus, FaCheck } from "react-icons/fa";
import { RiPulseLine } from "react-icons/ri";

const Status = ({ isStatusActive, handleClick, addTag }) => {
  return (
    <div className="dropdown relative" data-value="Status">
      <div className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg" onClick={handleClick}>
        Status
        {isStatusActive ? <FaAngleDown className="rotate-180 transition-all duration-300" /> : <FaAngleDown className="transition-all duration-300" />}
      </div>
      <div
        className={`status-dropdown absolute transition-all duration-100 ${
          isStatusActive ? "opacity-1 scale-100" : "opacity-0 scale-0"
        } top-16 shadow shadow-dropDown left-0 p-3 w-40 hover:cursor-pointer bg-secondary rounded-xl`}
      >
        <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 mb-3 rounded-lg px-3 py-1" value="Easy" onClick={addTag}>
          <FaMinus />
          To Do
        </div>
        <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 mb-3 rounded-lg px-3 py-1" value="Medium" onClick={addTag}>
          <FaCheck className="text-easyGreen" />
          Solved
        </div>
        <div className="flex flex-row gap-x-3 items-center hover:bg-accent3 rounded-lg px-3 py-1" value="Hard" onClick={addTag}>
          <RiPulseLine className="text-mediumYellow" />
          Attempted
        </div>
      </div>
    </div>
  );
};

export default Status;
