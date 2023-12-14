import { FaRegCalendarPlus } from "react-icons/fa";

const UpcomingContest = ({ name, timeStamp, live, style }) => {
  return (
    <div style={style} className="flex flex-col justify-items-center bg-gradient-to-b from-black20 to-transparent bg-accent3 h-40 rounded-xl p-4 b md:min-w-[372px] w-80">
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="font-bold sm:text-xl">{name}</h1>
        <FaRegCalendarPlus className="hover:text-accent1 hover:cursor-pointer transition-all duration-300 text-xl" />
      </div>
      <p>{timeStamp}</p>
      <div className="flex flex-row justify-content-start items-end grow">
        <button className="p-1 bg-accent1 hover:bg-lightAccent1 font-bold text-white mr-auto mt-auto rounded-xl w-28 self-start">Register</button>
        {live === "true" ? (
          <div className="flex flex-row px-2 gap-x-3 items-center p-1 text-sm w-20 uppercase font-bold leading-5 bg-hardRed text-white rounded-xl">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            Live
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UpcomingContest;
