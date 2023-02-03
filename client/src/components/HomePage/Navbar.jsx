import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBell, FaSearch, FaUserAlt } from "react-icons/fa";

const HomeNavbar = (props) => {
  const [activeTab, setActiveTab] = useState("Contest");
  return (
    <div className="flex flex-row justify-start border-b max-w-[1440px] border-b-accent2 w-full">
      <Link to="/">
        <img className="p-3 hover:cursor-pointer" src="../../../favicon.svg" alt="logo" />
      </Link>
      <ul className="flex flex-row justify-center">
        <NavLink to="/contest" onClick={() => setActiveTab("Contest")}>
          <li className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 ${activeTab === "Contest" ? " border-b-2 border-b-accent1" : ""}`}>
            Contest
          </li>
        </NavLink>
        <NavLink to="/problem" onClick={() => setActiveTab("Problems")}>
          <li className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 ${activeTab === "Problems" ? " border-b-2 border-b-accent1" : ""}`}>
            Problems
          </li>
        </NavLink>
        <NavLink to="/discussion" onClick={() => setActiveTab("Discussions")}>
          <li className={`box-border p-4 text-lg cursor-pointer hover:bg-accent2 hover:border-b-accent1 transition duration-300 ${activeTab === "Discussions" ? " border-b-2 border-b-accent1" : ""}`}>
            Discussions
          </li>
        </NavLink>
      </ul>
      <div className="flex flex-row items-center gap-x-6 ml-auto">
        <FaSearch className="text-2xl hover:cursor-pointer" />
        <button className="p-3 hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 hover:shadow-sky-900 bg-accent1 text-white text-base font-bold rounded-xl">
          Create/Join a Room
        </button>
        <FaBell className="text-2xl hover:cursor-pointer" />
        <div className="w-11 h-11 flex flex-row items-center justify-center rounded-full bg-grey2">
          <FaUserAlt className="text-2xl hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
