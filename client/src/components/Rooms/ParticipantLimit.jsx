import { FaAngleDown, FaUserAlt } from "react-icons/fa";

const ParticipantLimit = ({ participantLimit, setParticipantLimit, isLimitActive, setLimitActive }) => {
  return (
    <div className="flex flex-col sm:col-span-2 col-span-1">
      <div className="flex gap-3 items-center">
        <FaUserAlt /> Limit
      </div>
      <div className="limit flex flex-row gap-x-3 grow">
        <div className="relative flex flex-row grow justify-between">
          <div className="flex flex-row grow justify-between items-center px-3 py-2 bg-secondary rounded-lg hover:cursor-pointer" onClick={() => setLimitActive((prev) => !prev)}>
            {participantLimit}
            <FaAngleDown />
          </div>
          <div
            className={`limit-dropdown absolute transition-all duration-100 ${
              isLimitActive ? "z-20  opacity-1 scale-100" : "opacity-0 scale-0"
            } top-16 shadow shadow-dropDown left-0 p-3 sm:w-40 w-24 hover:cursor-pointer bg-secondary rounded-xl`}
          >
            <div
              className="hover:bg-accent3 mb-3 rounded-lg px-3 py-1"
              value="10"
              onClick={() => {
                setParticipantLimit(10);
                setLimitActive(false);
              }}
            >
              10
            </div>
            <div
              className="hover:bg-accent3 mb-3 rounded-lg px-3 py-1"
              value="20"
              onClick={() => {
                setParticipantLimit(20);
                setLimitActive(false);
              }}
            >
              20
            </div>
            <div
              className="hover:bg-accent3 rounded-lg px-3 py-1"
              value="50"
              onClick={() => {
                setParticipantLimit(50);
                setLimitActive(false);
              }}
            >
              50
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantLimit;
