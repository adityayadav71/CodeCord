import { BiAlarm } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

const RoomDuration = ({ roomType, updateTimeLimit, hrs, mins }) => {
  return (
    <>
      {roomType === "Contest" && (
        <div className="flex flex-col sm:col-span-2 col-span-4">
          <h1>Set Contest Duration</h1>
          <div className="relative select-none grow">
            <input
              type="range"
              className="w-full h-full bg-greenBackGround appearance-none rounded-lg cursor-pointer outline-none"
              id="slider"
              min={10}
              max={120}
              step={5}
              style={{
                background: "linear-gradient(90deg, rgb(44 187 93) 8.33%, rgb(41 77 53) 8.33%)",
              }}
              onChange={updateTimeLimit}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-3 flex flex-row items-center gap-x-3">
              <BiAlarm className="text-xl" />
              <p className="text-lg text-white font-bold">
                {hrs} {mins}
              </p>
            </div>
          </div>
        </div>
      )}
      {roomType === "Default" && (
        <h1 className="flex items-center gap-3 leading-6 text-grey1 self-center m-auto sm:col-span-2 col-span-4">
          <FaInfoCircle />
          <p>
            Default room ends in <span className="text-accent1 font-bold">40 minutes</span>
          </p>
        </h1>
      )}
    </>
  );
};

export default RoomDuration;
