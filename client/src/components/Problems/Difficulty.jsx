import React from "react";
import { FaAngleDown } from "react-icons/fa";

const Difficulty = ({ isDifficultyActive, handleClick, addTag }) => {
  return (
    <div className="dropdown relative" data-value="Difficulty">
      <div className="flex flex-row items-center hover:bg-lightSecondary justify-between gap-x-3 bg-secondary mb-3 w-fit p-3 hover:cursor-pointer outline-none rounded-lg" onClick={handleClick}>
        Difficulty
        {isDifficultyActive ? <FaAngleDown className="rotate-180 transition-all duration-300" /> : <FaAngleDown className="transition-all duration-300" />}
      </div>
      <div
        className={`difficulty-dropdown absolute transition-all duration-100 ${
          isDifficultyActive ? "opacity-1 scale-100" : "opacity-0 scale-0"
        } top-16 shadow shadow-dropDown left-0 p-3 w-40 hover:cursor-pointer bg-secondary rounded-xl`}
      >
        <div className="hover:bg-accent3 mb-3 text-easyGreen rounded-lg px-3 py-1" value="Easy" onClick={addTag}>
          Easy
        </div>
        <div className="hover:bg-accent3 mb-3 text-mediumYellow rounded-lg px-3 py-1" value="Medium" onClick={addTag}>
          Medium
        </div>
        <div className="hover:bg-accent3 text-hardRed rounded-lg px-3 py-1" value="Hard" onClick={addTag}>
          Hard
        </div>
      </div>
    </div>
  );
};

export default Difficulty;
