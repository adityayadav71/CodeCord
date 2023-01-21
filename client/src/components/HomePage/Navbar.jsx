import React from "react";
import { FaBell, FaSearch, FaUserAlt } from "react-icons/fa";

const HomeNavbar = (props) => {
  return (
    <div className="flex flex-row items-center justify-start border-b border-b-accent2">
      <img className="p-3 hover:cursor-pointer" src="../../../public/favicon.svg" alt="logo" />
      <ul className="flex flex-row items-center justify-center">
        <li className="p-4 border-b-2 cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 border-b-accent1">Contest</li>
        <li className="p-4 border-b-2 cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 border-b-primary">Problems</li>
        <li className="p-4 border-b-2 cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 border-b-primary">Discussions</li>
      </ul>
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        <FaSearch className="text-2xl hover:cursor-pointer"/>
        <button className="p-3 hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 bg-accent1 text-white text-base font-bold rounded-xl">Create/Join a Room</button>
        <FaBell className="text-2xl hover:cursor-pointer"/>
        <div className="w-11 h-11 flex flex-row items-center justify-center rounded-full bg-grey2">
          <FaUserAlt className="text-2xl hover:cursor-pointer"/>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
