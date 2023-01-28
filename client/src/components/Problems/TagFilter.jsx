import React from "react";
import { FaSearch } from "react-icons/fa";

const TagFilter = ({isTagsActive}) => {
  return (
    <div
      className={`absolute transition-all duration-300 ${
        isTagsActive ? "opacity-1 top-16" : "opacity-0 top-20"
      } shadow shadow-dropDown left-0 p-3 h-fit w-96 hover:cursor-pointer bg-secondary rounded-xl`}
    >
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="bg-accent4 shadow shadow-heading rounded-2xl h-fit px-4">Topics</div>
          <div className="flex flex-row items-center shadow shadow-heading gap-x-3 h-fit w-fit px-2 focus:outline-none bg-accent4 rounded-lg">
            <FaSearch />
            <input className="h-fit w-fit bg-accent4 focus:outline-none" type="text" placeholder="Filter topics and companies" />
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-start justify-start w-full gap-3 mb-3 h-20 overflow-hidden">
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Arrays</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Strings</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Dynamic Programming</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Math</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Recursion</p>
        </div>
      </div>
      <button className="ml-1 mb-3 text-accent1">Expand</button>
      <div className="flex flex-col items-start justify-start gap-y-4 h-full">
        <div className="flex flex-row justify-between items-center">
          <div className="bg-accent4 shadow shadow-heading rounded-2xl h-fit px-4">Companies</div>
        </div>
        <div className="flex flex-row flex-wrap items-start justify-start w-full gap-3 mb-3 h-20 overflow-hidden">
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Amazon</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Microsoft</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Apple</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Google</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Facebook</p>
          <p className="px-3 bg-accent2 hover:bg-grey1 rounded-xl">Netflix</p>
        </div>
      </div>
      <button className="ml-1 text-accent1">Expand</button>
    </div>
  );
};

export default TagFilter;
