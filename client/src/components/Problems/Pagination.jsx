import React from "react";
import { FaArrowLeft, FaArrowRight, FaAngleDown } from "react-icons/fa";

const pagination = (props) => {
  return (
    <div className="flex flex-row p-3 gap-x-3 pl-20 bg-secondary w-full rounded-xl">
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1 mr-6">
        <FaArrowLeft />
      </div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">1</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">2</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">3</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">4</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">5</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">6</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">7</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">8</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">9</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">10</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1">11</div>
      <div className="flex flex-row items-center justify-center bg-accent2 p-3 text-white rounded-xl w-10 h-10 hover:cursor-pointer hover:bg-accent1 ml-6">
        <FaArrowRight />
      </div>
      <div className="flex flex-row items-center justify-center bg-accent2 gap-x-3 px-3 text-white rounded-xl hover:cursor-pointer hover:bg-accent1 ml-auto">
        20/Page <FaAngleDown />
      </div>
    </div>
  );
};

export default pagination;
