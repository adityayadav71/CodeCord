import { FaUsers, FaGlobeAsia } from "react-icons/fa";

const RoomVisibility = ({ visibility, setVisibility }) => {
  return (
    <div className="flex flex-row gap-x-3">
      <div className="relative">
        <FaUsers
          className={`peer text-3xl p-1 ${
            visibility === "private" ? "bg-accent1" : "bg-secondary"
          }  hover:cursor-pointer rounded-lg`}
          onClick={() => {
            setVisibility("private");
          }}
        />
        <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-10 px-3 py-1 bg-white text-primary rounded-lg">
          Make room private
        </div>
      </div>
      <div className="relative">
        <FaGlobeAsia
          className={`peer text-3xl p-1 ${
            visibility === "public" ? "bg-accent1" : "bg-secondary"
          } hover:cursor-pointer rounded-lg`}
          onClick={() => {
            setVisibility("public");
          }}
        />
        <div className="absolute peer-hover:scale-100 peer-hover:opacity-100 scale-75 w-max opacity-0 transition-all duration-150 top-10 px-3 py-1 bg-white text-primary rounded-lg">
          Make room public
        </div>
      </div>
    </div>
  );
};

export default RoomVisibility;
